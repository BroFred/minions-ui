import { tail, last, dropLast, drop } from 'ramda';

export default function(CodeMirror) {
    "use strict";
  
    var tables;
    var defaultTable;
    var keywords;
    var identifierQuote;
    var CONS = {
      QUERY_DIV: ";",
      ALIAS_KEYWORD: "AS"
    };
    var Pos = CodeMirror.Pos, cmpPos = CodeMirror.cmpPos;
  
    function isArray(val) { return Object.prototype.toString.call(val) == "[object Array]" }
  
    function getKeywords(editor) {
      var mode = editor.doc.modeOption;
      if (mode === "sql") mode = "text/x-sql";
      return CodeMirror.resolveMode(mode).keywords;
    }
  
    function getIdentifierQuote(editor) {
      var mode = editor.doc.modeOption;
      if (mode === "sql") mode = "text/x-sql";
      return CodeMirror.resolveMode(mode).identifierQuote || "`";
    }
  
    function getText(item) {
      return typeof item == "string" ? item : item.text;
    }
  
    function wrapTable(name, value) {
      if (isArray(value)) value = {columns: value}
      if (!value.text) value.text = name
      return value
    }
  
    function parseTables(input) {
      var result = {}
      if (isArray(input)) {
        for (var i = input.length - 1; i >= 0; i--) {
          var item = input[i]
          result[getText(item).toUpperCase()] = wrapTable(getText(item), item)
        }
      } else if (input) {
        for (var name in input)
          result[name.toUpperCase()] = wrapTable(name, input[name])
      }
      return result
    }
  
    function getTable(name) {
      return tables[name.toUpperCase()]
    }
  
    function shallowClone(object) {
      var result = {};
      for (var key in object) if (object.hasOwnProperty(key))
        result[key] = object[key];
      return result;
    }
  
    function match(string, word) {
      var len = string.length;
      var sub = getText(word).substr(0, len);
      return string.toUpperCase() === sub.toUpperCase();
    }
  
    function addMatches(result, search, wordlist, formatter) {
      if (isArray(wordlist)) {
        for (var i = 0; i < wordlist.length; i++)
          if (match(search, wordlist[i])) result.push(formatter(wordlist[i]))
      } else {
        for (var word in wordlist) if (wordlist.hasOwnProperty(word)) {
          var val = wordlist[word]
          if (!val || val === true)
            val = word
          else
            val = val.displayText ? {text: val.text, displayText: val.displayText} : val.text
          if (match(search, val)) result.push(formatter(val))
        }
      }
    }
  
    function cleanName(name, flag) {
      // Get rid name from identifierQuote and preceding dot(.)
      if (name.charAt(0) == "." && flag) {
        name = name.substr(1);
      }
      // replace duplicated identifierQuotes with single identifierQuotes
      // and remove single identifierQuotes
      var nameParts = name.split(identifierQuote+identifierQuote);
      for (var i = 0; i < nameParts.length; i++)
        nameParts[i] = nameParts[i].replace(new RegExp(identifierQuote,"g"), "");
      return nameParts.join(identifierQuote);
    }
  
    function insertIdentifierQuotes(name) {
      var nameParts = getText(name).split(".");
      for (var i = 0; i < nameParts.length; i++)
        nameParts[i] = identifierQuote +
          // duplicate identifierQuotes
          nameParts[i].replace(new RegExp(identifierQuote,"g"), identifierQuote+identifierQuote) +
          identifierQuote;
      var escaped = nameParts.join(".");
      if (typeof name == "string") return escaped;
      name = shallowClone(name);
      name.text = escaped;
      return name;
    }
  
    function nameCompletion(cur, token, result, editor, singleTableColumns) {
      // Try to complete table, column names and return start position of completion
      console.log('token', token, cur);
      var useIdentifierQuotes = false;
      var nameParts = [];
      var start = token.start;
      var cont = true;
      var count = 0;
      while (cont) {
        console.log('token.string...', token);
        cont = (token.string.charAt(0) == ".");
        useIdentifierQuotes = useIdentifierQuotes || (token.string.charAt(0) == identifierQuote);
  
        start = token.start;
        nameParts.unshift(cleanName(token.string, count === 0));
  
        token = editor.getTokenAt(Pos(cur.line, token.start));
        if (token.string == ".") {
          cont = true;
          token = editor.getTokenAt(Pos(cur.line, token.start));
        } else if (token.type === 'number') {
          cont = true;
        }
        ++count;
      }

      if (nameParts.length > 2){
        nameParts = [dropLast(1, nameParts).join(''), last(nameParts)];
      }
      console.log('nameParts', nameParts);

      // 根据 ?k. 尝试提供关键字
      const keywordsTrigger = nameParts[0] === '?k';
      const keywords = CodeMirror.resolveMode('text/x-mysql').keywords;
      if (keywordsTrigger) {
          addMatches(result, tail(nameParts).join('.'), keywords, function(w) {
              return useIdentifierQuotes ? insertIdentifierQuotes(w.toUpperCase()) : w.toUpperCase();
            });
          return start;
      }

      // 根据 ?t. 尝试提供表名
      const tablesTrigger = nameParts[0] === '?t';
      console.log('tablesTrigger', tablesTrigger);
      if (tablesTrigger) {
        addMatches(result, tail(nameParts).join('.'), tables, function(w) {
          return useIdentifierQuotes ? insertIdentifierQuotes(w) : w;
        });
      return start;
      }

      // 根据 ?c. 尝试提供某张表的字段名
      const columnssTrigger = nameParts[0] === '?c';
      if (columnssTrigger) {
        addMatches(result, tail(nameParts).join('.'), singleTableColumns, function(w) {
          return useIdentifierQuotes ? insertIdentifierQuotes(w) : w;
        });
      return start;
      }
  
      // Try to complete table names
      var string = nameParts.join(".");
      addMatches(result, string, tables, function(w) {
        return useIdentifierQuotes ? insertIdentifierQuotes(w) : w;
      });
  
      // Try to complete columns from defaultTable
      addMatches(result, string, defaultTable, function(w) {
        return useIdentifierQuotes ? insertIdentifierQuotes(w) : w;
      });
  
      // Try to complete columns
      string = nameParts.pop();
      var table = nameParts.join(".");
      console.log('找表格', table, string);
  
      var alias = false;
      var aliasTable = table;
      // Check if table is available. If not, find table by Alias
      if (!getTable(table)) {
        var oldTable = table;
        table = findTableByAlias(table, editor);
        if (table !== oldTable) alias = true;
      }
  
      var columns = getTable(table);
      if (columns && columns.columns)
        columns = columns.columns;
  
      if (columns) {
        addMatches(result, string, columns, function(w) {
          var tableInsert = table;
          if (alias == true) tableInsert = aliasTable;
        //   if (typeof w == "string") {
        //     w = tableInsert + "." + w;
        //   } else {
        //     w = shallowClone(w);
        //     w.text = tableInsert + "." + w.text;
        //   }
          return useIdentifierQuotes ? insertIdentifierQuotes(w) : w;
        });
      }
  
      return start;
    }
  
    function eachWord(lineText, f) {
      var words = lineText.split(/\s+/)
      for (var i = 0; i < words.length; i++)
        if (words[i]) f(words[i].replace(/[`,;]/g, ''))
    }
  
    function findTableByAlias(alias, editor) {
      var doc = editor.doc;
      var fullQuery = doc.getValue();
      var aliasUpperCase = alias.toUpperCase();
      var previousWord = "";
      var table = "";
      var separator = [];
      var validRange = {
        start: Pos(0, 0),
        end: Pos(editor.lastLine(), editor.getLineHandle(editor.lastLine()).length)
      };
  
      //add separator
      var indexOfSeparator = fullQuery.indexOf(CONS.QUERY_DIV);
      while(indexOfSeparator != -1) {
        separator.push(doc.posFromIndex(indexOfSeparator));
        indexOfSeparator = fullQuery.indexOf(CONS.QUERY_DIV, indexOfSeparator+1);
      }
      separator.unshift(Pos(0, 0));
      separator.push(Pos(editor.lastLine(), editor.getLineHandle(editor.lastLine()).text.length));
  
      //find valid range
      var prevItem = null;
      var current = editor.getCursor()
      for (var i = 0; i < separator.length; i++) {
        if ((prevItem == null || cmpPos(current, prevItem) > 0) && cmpPos(current, separator[i]) <= 0) {
          validRange = {start: prevItem, end: separator[i]};
          break;
        }
        prevItem = separator[i];
      }
  
      if (validRange.start) {
        var query = doc.getRange(validRange.start, validRange.end, false);
  
        for (var i = 0; i < query.length; i++) {
          var lineText = query[i];
          eachWord(lineText, function(word) {
            var wordUpperCase = word.toUpperCase();
            if (wordUpperCase === aliasUpperCase && getTable(previousWord))
              table = previousWord;
            if (wordUpperCase !== CONS.ALIAS_KEYWORD)
              previousWord = word;
          });
          if (table) break;
        }
      }
      return table;
    }

    function getMissNumbers(str) {
      const res = [];
      for (let i = str.length - 1; i >= 0; --i) {
        if (i === str.length - 1 && !(/\d/ig.test(str[i]))) {
          return res;
        } else if (!(/\d/ig.test(str[i]))) {
          return res;
        } else {
          res.unshift(str[i]);
        }
      }
      return res;
    }

    // 默认模式，1. 没有 ??. 命令时，优先提示关键字，次之提示表名   2. 有 ?t. ?k. ?c.时，提示相应内容
    CodeMirror.registerHelper("hint", "defaultSql", function(editor, options, singleTableColumns) {
      tables = parseTables(options && options.tables)
    //   const columns = getColumns(Object.values(tables));
      var defaultTableName = options && options.defaultTable;
      var disableKeywords = options && options.disableKeywords;
      defaultTable = defaultTableName && getTable(defaultTableName);
      keywords = getKeywords(editor);
      identifierQuote = getIdentifierQuote(editor);
  
      if (defaultTableName && !defaultTable)
        defaultTable = findTableByAlias(defaultTableName, editor);
  
      defaultTable = defaultTable || [];
      if (defaultTable.columns)
        defaultTable = defaultTable.columns;
  
      var cur = editor.getCursor();
      var result = [];
      var token = editor.getTokenAt(cur), start, end, search;
      console.log('token before process', token, editor.getLineTokens(cur.line));
      const curLineBeforeToken = editor.getLine(cur.line).substring(0, cur.ch - 1);
      
      // const missNumber =  /\s*\d+\w*$/ig.test(last(curLineBeforeToken));
      const lineTokens = editor.getLineTokens(cur.line)
      console.log('倒数第二个', lineTokens[lineTokens.length - 2], typeof lineTokens);
      const missNumber =  (lineTokens[lineTokens.length - 2]?.type ?? '') === 'number';
      var missRes = [];
      if (missNumber) {
        missRes = getMissNumbers(dropLast(1, [...lineTokens]).map(item => item.string).join(''));
        token.string = `${missRes.join('')}${token.type === 'number' ? drop(missRes.length, token.string) : token.string}`;

      }
      if (token.end > cur.ch) {
        token.end = cur.ch;
        token.string = token.string.slice(0, cur.ch - token.start);
      }
      console.log('token', token, curLineBeforeToken, missNumber, getMissNumbers(curLineBeforeToken));
  
      if (token.string.match(/^[.`"'\w@][\w$#]*$/g) || token.type === 'punctuation' || token.type === 'string') {
        search = token.string;
        start = missNumber ? token.start - missRes.length : token.start;
        end = token.end;
        console.log('if', search);
      } else {
        start = end = cur.ch;
        search = "";
      }
      if (search.charAt(0) == "." || search.charAt(0) == identifierQuote) {
        start = nameCompletion(cur, token, result, editor, singleTableColumns);
      } else {
        var objectOrClass = function(w, className) {
          if (typeof w === "object") {
            w.className = className;
          } else {
            w = { text: w, className: className };
          }
          return w;
        };
        console.log('just search', search);
        if (!disableKeywords)
        addMatches(result, search, keywords, function(w) {
            return objectOrClass(w.toUpperCase(), "CodeMirror-hint-keyword");
        });
      addMatches(result, search, defaultTable, function(w) {
          return objectOrClass(w, "CodeMirror-hint-table CodeMirror-hint-default-table");
      });
      addMatches(
          result,
          search,
          tables, function(w) {
            return objectOrClass(w, "CodeMirror-hint-table");
          }
      );
    //   addMatches(
    //     result,
    //     search,
    //     columns, function(w) {
    //       return objectOrClass(w, "CodeMirror-hint-columns");
    //     }
    // );
    }
  
      return {list: result, from: Pos(cur.line, start), to: Pos(cur.line, end)};
    });
}