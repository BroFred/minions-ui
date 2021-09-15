import { tail, last, dropLast, drop, range } from 'ramda';
import { clickhouseCommonFunctions } from './functionData'

export const _debounce = (
  fn: any,
  delay: number,
  immediate = false
): any => {
  let timer;
  return (params): void => {
    if (immediate) {
      fn(params);
    }
    clearTimeout(timer);
    timer = setTimeout(() => fn(params), delay);
  };
};

export default function(CodeMirror, keywordsAndFunctions) {
    "use strict";
  
    var tables;
    var defaultTable;
    // var keywords;
    var identifierQuote;
    var CONS = {
      QUERY_DIV: ";",
      ALIAS_KEYWORD: "AS"
    };
    var Pos = CodeMirror.Pos, cmpPos = CodeMirror.cmpPos;

    const commonFunction = ['count', 'min', 'max', 'sum', 'avg', 'any', 'stddevPop', 'stddevSamp', 'varPop', 'varSamp', 'covarPop', 'covarSamp', ...clickhouseCommonFunctions];
    const clickHouseFunction = ["anyHeavy", "anyLast", "argMin", "argMax", "avgWeighted", "topK", "topKWeighted", "groupArray", "groupUniqArray", "groupArrayInsertAt", "groupArrayMovingAvg", "groupArrayMovingSum", "groupBitAnd", "groupBitOr", "groupBitXor", "groupBitmap", "groupBitmapAnd", "groupBitmapOr", "groupBitmapXor", "sumWithOverflow", "sumMap", "minMap", "maxMap", "skewSamp", "skewPop", "kurtSamp", "kurtPop", "uniq", "uniqExact", "uniqCombined", "uniqCombined64", "uniqHLL12", "quantile", "quantiles", "quantileExact", "quantileExactLow", "quantileExactHigh", "quantileExactWeighted", "quantileTiming", "quantileTimingWeighted", "quantileDeterministic", "quantileTDigest", "quantileTDigestWeighted", "simpleLinearRegression", "stochasticLinearRegression", "stochasticLogisticRegression", "categoricalInformationValue"]
    const functions = [...commonFunction,  ...clickHouseFunction];
    const builtInKeywords = CodeMirror.resolveMode('text/x-mysql').keywords;
    const helpHints = ['?k.', '?f.', '?t.', '?c.'];
    const keywords = [...removeDuplicateKeywords(Object.keys(builtInKeywords)), ...helpHints];
    CodeMirror.resolveMode('text/x-mysql').keywords['parseDateTime32BestEffort'] = true;
    // console.log('function', functions.length);
    functions.forEach(func => builtInKeywords[func] = true);
    if (keywordsAndFunctions.keywords) {
      keywordsAndFunctions.keywords.forEach(keyword => builtInKeywords[keyword] = true);
    }
    if (keywordsAndFunctions.functions) {
      keywordsAndFunctions.functions.forEach(func => builtInKeywords[func] = true);
    }
    console.log('CodeMirror.resolveMode()', CodeMirror.resolveMode('text/x-mysql'));

    function removeDuplicateKeywords (keywords) {
      const s = new Set(keywords);
      commonFunction.forEach(item => {s.delete(item)});
      return Array.from(s);
    }

    // CodeMirror.defineOption("keyword", null, function(cm, val, prev) {
    //   debugger;
    //   if (prev == CodeMirror.Init) prev = false;
    // if (prev && !val)
    //   cm.removeOverlay("keyword");
    // else if (!prev && val)
    //   cm.addOverlay({
    //     token: function(stream) {
    //       for (var key in cm.options.keyword) {
    //         if (stream.match(key, true)) {return cm.options.keyword[key];}
    //       }
    //       stream.next();
    //     },
    //     name: "keyword"
    //   });
    // });

    CodeMirror.keyword = {
      junior: 'style1',
      price: 'style1',
    };
  
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

    function fuzzysearch(needle, haystack) {
      const tlen = haystack.length;
      const qlen = needle.length;
      if (qlen > tlen) {
        return false;
      }
      if (qlen === tlen) {
        return needle === haystack;
      }
      outer: for (let i = 0, j = 0; i < qlen; i++) {
        const nch = needle.charCodeAt(i);
        while (j < tlen) {
          if (haystack.charCodeAt(j++) === nch) {
            continue outer;
          }
        }
        return false;
      }
      return true;
    }

    function fuzzysearch2(needle, haystack) {
      const tlen = haystack.length;
      const qlen = needle.length;
      if (qlen > tlen) {
        return false;
      }
      if (qlen === tlen) {
        return needle === haystack;
      }
      const pos = [];
      outer: for (let i = 0, j = 0; i < qlen; i++) {
        const nch = needle.charCodeAt(i);
        while (j < tlen) {
          if (haystack.charCodeAt(j++) === nch) {
            pos.push(j - 1);
            continue outer;
          }
        }
        return false;
      }
      console.log('pos', pos);
      return true;
    }
  
    function match(string, word) {
      // console.log(fuzzysearch2('slc', 'select'));
      var len = string.length;
      var sub = getText(word).substr(0, len);
      // return string.toUpperCase() === sub.toUpperCase();
      if (string.toUpperCase() === word.toUpperCase()) {
        return 'Strictly'
      }
      if (string.toUpperCase() === sub.toUpperCase()) 
        return 'LessStrictly';
      return fuzzysearch(string.toUpperCase(), word.toUpperCase());
      // return includes(string, word);
    }
  
    function addMatches(result, search, wordlist, formatter) {
      if (isArray(wordlist)) {
        // console.log('if if if fi if if if if if if fi if if ifif if if fi if if ifif if if fi if if if', wordlist);
        // const fuse = new Fuse(wordlist, fuseOptions);
        // console.log('fuse', fuse.search(search).map(res => formatter(res.item)));
        // result.push(...fuse.search(search).map(res => formatter(res.item)));
        for (var i = 0; i < wordlist.length; i++) {
          const matchRes = match(search, wordlist[i]);
          if (matchRes === 'Strictly') {
            result.push({
              strict: 'Strictly',
              text: formatter(wordlist[i]),
            });
          } else if (matchRes === 'LessStrictly') {
            result.push({
              strict: 'LessStrictly',
              text: formatter(wordlist[i]),
            });
          } 
           else if (matchRes) {
            result.push({
              strict: false,
              text: formatter(wordlist[i]),
            });
          }
        }
      } else {
        // console.log('else else else else else else else else else else else else else else else');
        // const fuse = new Fuse(Object.values(wordlist), fuseOptions);

        // result.push(...fuse.search(search).map(res => formatter(res.item)));
        for (var word in wordlist) if (wordlist.hasOwnProperty(word)) {
          var val = wordlist[word]
          if (!val || val === true)
            val = word
          else
            val = val.displayText ? {text: val.text, displayText: val.displayText} : val.text
          // if (match(search, val)) result.push(formatter(val))
          const matchRes = match(search, val);
          if (matchRes === 'Strictly') {
            result.push({
              strict: 'Strictly',
              text: formatter(val),
            });
          } else if (matchRes === 'LessStrictly') {
            result.push({
              strict: 'LessStrictly',
              text: formatter(val),
            });
          } else if (matchRes) {
            result.push({
              strict: false,
              text: formatter(val),
            });
          }
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
  
    function nameCompletion(cur, token, result, editor, singleTableColumns, keywordsAndFunctions) {
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
      var objectOrClass = function(w, className) {
        if (typeof w === "object") {
          w.className = className;
        } else {
          w = { text: w, className: className };
        }
        return w;
      };

      // 根据 ?k. 尝试提供关键字
      const keywordsTrigger = nameParts[0].toUpperCase() === '?K';
      if (keywordsTrigger) {
        const search = tail(nameParts).join('.');
          addMatches(result, search, keywordsAndFunctions.keywords || keywords, function(w) {
              return useIdentifierQuotes ? insertIdentifierQuotes(w.toUpperCase()) : objectOrClass(w.toUpperCase(), `CodeMirror-hint-keyword ${search}`);
            });
          return start;
      }

      // 根据 ?f. 尝试提供关键字
      const functionsTrigger = nameParts[0].toUpperCase() === '?F';
      if (functionsTrigger) {
        const search = tail(nameParts).join('.');
          addMatches(result, search, keywordsAndFunctions.functions || functions, function(w) {
              return useIdentifierQuotes ? insertIdentifierQuotes(w) : objectOrClass(w, `CodeMirror-hint-function ${search}`);
            });
          return start;
      }

      // 根据 ?t. 尝试提供表名
      const tablesTrigger = nameParts[0].toUpperCase() === '?T';
      console.log('tablesTrigger', tablesTrigger);
      if (tablesTrigger) {
        const search = tail(nameParts).join('.');
        addMatches(result, search, tables, function(w) {
          return useIdentifierQuotes ? insertIdentifierQuotes(w) : objectOrClass(w, `CodeMirror-hint-table ${search}`);
        });
      return start;
      }

      // 根据 ?c. 尝试提供某张表的字段名
      const columnssTrigger = nameParts[0].toUpperCase() === '?C';
      if (columnssTrigger) {
        const search = tail(nameParts).join('.')
        addMatches(result, search, singleTableColumns, function(w) {
          return useIdentifierQuotes ? insertIdentifierQuotes(w) : objectOrClass(w, `CodeMirror-hint-column ${search}`);
        });
      return start;
      }
  
      // Try to complete table names
      var search = nameParts.join(".");
      addMatches(result, search, tables, function(w) {
        return useIdentifierQuotes ? insertIdentifierQuotes(w) : objectOrClass(w, `CodeMirror-hint-table ${search}`);
      });
  
      // Try to complete columns from defaultTable
      // addMatches(result, string, defaultTable, function(w) {
      //   return useIdentifierQuotes ? insertIdentifierQuotes(w) : w;
      // });
  
      // Try to complete columns
      var string = nameParts.pop();
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
          if (typeof w == "string") {
            w = tableInsert + "." + w;
          } else {
            w = shallowClone(w);
            w.text = tableInsert + "." + w.text;
          }
          return useIdentifierQuotes ? insertIdentifierQuotes(w) : objectOrClass(w, `CodeMirror-hint-column ${table}.${string}`);
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
    CodeMirror.registerHelper("hint", "defaultSql", function(editor, options, singleTableColumns, keywordsAndFunctions) {
      tables = parseTables(options && options.tables)
      console.log('parse的table', tables);
    //   const columns = getColumns(Object.values(tables));
      // var defaultTableName = options && options.defaultTable;
      var disableKeywords = options && options.disableKeywords;
      // defaultTable = defaultTableName && getTable(defaultTableName);
      // keywords = getKeywords(editor);
      identifierQuote = getIdentifierQuote(editor);
  
      // if (defaultTableName && !defaultTable)
      //   defaultTable = findTableByAlias(defaultTableName, editor);
  
      // defaultTable = defaultTable || [];
      // if (defaultTable.columns)
      //   defaultTable = defaultTable.columns;
  
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
  
      if (token.string.match(/^[.?`"'\w@][\w$#]*$/g) || token.type === 'punctuation' || token.type === 'string') {
        search = token.string;
        start = missNumber ? token.start - missRes.length : token.start;
        end = token.end;
        console.log('if', search);
      } else {
        start = end = cur.ch;
        search = "";
      }
      if (search.charAt(0) == ".") {
        start = nameCompletion(cur, token, result, editor, singleTableColumns, keywordsAndFunctions);
      } 
      // else if ( token.type === 'number' || /^[~!@#$%^&*()?_+=]/ig.test(token.string)) {
      else if ( /^([~!@#$%^&*()_+=/\\|{}\[\]]|\.+)/ig.test(token.string)) {
        console.log('爷来啦');
        return {list: result, from: Pos(cur.line, start), to: Pos(cur.line, end)};
      }
        else {
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
        addMatches(result, search, keywordsAndFunctions.keywords || keywords, function(w) {
            return objectOrClass(w.toUpperCase(), `CodeMirror-hint-keyword ${search}`);
        });
      // addMatches(result, search, defaultTable, function(w) {
      //     return objectOrClass(w, "CodeMirror-hint-table CodeMirror-hint-default-table");
      // });
      addMatches(result, search, keywordsAndFunctions.functions || functions, function(w) {
        return objectOrClass(w, `CodeMirror-hint-function ${search}`);
    });
      addMatches(
          result,
          search,
          tables, function(w) {
            return objectOrClass(w,  `CodeMirror-hint-table ${search}`);
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

    // console.log('结果是', keywords, tables, result);
    const strictResult = [];
    const lessStrictResult = [];
    const fuzzResult = [];
    result.forEach(item => {
      if (item.strict === 'Strictly') strictResult.push(item.text);
      else if (item.strict === 'LessStrictly') lessStrictResult.push(item. text);
      else fuzzResult.push(item.text)
      // item.strict ? strictResult.push(item.text) : fuzzResult.push(item.text);
    })
    // console.log('transform///', [...strictResult, ...fuzzResult]);
    // console.log('length', strictResult.length + lessStrictResult.length, fuzzResult.length, [...strictResult, ...lessStrictResult, ...fuzzResult]);
  
      return {list: [...strictResult, ...lessStrictResult, ...fuzzResult], from: Pos(cur.line, start), to: Pos(cur.line, end)};
    });
}