// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/LICENSE

// declare global: DOMRect
import React from 'react';
import ReactDOM from 'react-dom';
import { split, last, range } from 'ramda';
import { Box, Flex, Icon, IconProps, useColorModeValue } from '@chakra-ui/react';

export const KeywordIcon: React.FC<IconProps> = (props) => (
  <Icon viewBox='0 0 1024 1024' {...props}>
    <path d='M925.616 933.172L835.186 1023.6l-90.43-90.428 90.43-90.462zM820.104 827.66l-90.43 90.43-120.594-120.594 90.462-90.43z' fill='#8a8a8a' p-id='6570' />
    <path d='M531.476 599.296l90.428-90.428L1000.98 887.944l-90.428 90.428z' fill='#8a8a8a' p-id='6571' />
    <path d='M385.41 703.85h-0.032c-91.084 0-176.736-35.472-241.154-99.89-64.42-64.418-99.906-150.07-99.906-241.186 0-91.086 35.486-176.738 99.906-241.156 64.418-64.418 150.07-99.89 241.154-99.89 91.118 0 176.77 35.472 241.188 99.89 64.42 64.418 99.89 150.07 99.89 241.156 0 91.116-35.47 176.768-99.89 241.186-64.418 64.416-150.07 99.89-241.156 99.89z' fill='#8a8a8a' p-id='6572' />
    <path d='M385.378 0.4C185.254 0.4 23.006 162.648 23.006 362.774c0 200.154 162.248 362.404 362.374 362.404 200.158 0 362.404-162.25 362.404-362.404C747.784 162.648 585.538 0.4 385.378 0.4z m226.106 588.476c-29.382 29.382-63.576 52.428-101.64 68.542-39.406 16.674-81.28 25.106-124.464 25.106s-85.058-8.432-124.434-25.106c-38.08-16.114-72.272-39.158-101.654-68.542-29.37-29.382-52.444-63.574-68.542-101.638-16.658-39.406-25.106-81.28-25.106-124.464s8.448-85.058 25.106-124.434c16.098-38.064 39.156-72.29 68.542-101.64 29.382-29.382 63.574-52.458 101.654-68.57 39.406-16.644 81.25-25.106 124.434-25.106 43.186 0 85.058 8.46 124.464 25.106 38.064 16.112 72.258 39.188 101.64 68.57 29.384 29.352 52.458 63.576 68.542 101.64 16.674 39.376 25.106 81.248 25.106 124.434s-8.432 85.058-25.106 124.464c-16.082 38.064-39.156 72.256-68.542 101.638z' fill='#8a8a8a' p-id='6573' />
    <path d='M385.378 85.678c-153.038 0-277.112 124.058-277.112 277.096 0 11.772 9.554 21.326 21.328 21.326 11.772 0 21.31-9.554 21.31-21.326 0-62.638 24.386-121.5 68.682-165.808 44.292-44.278 103.184-68.664 165.792-68.664 11.774 0 21.328-9.556 21.328-21.328s-9.554-21.296-21.328-21.296z' fill='#8a8a8a' p-id='6574' />
  </Icon>
);

export const FunctionIcon: React.FC<IconProps> = (props) => (
  <Icon viewBox='0 0 1024 1024' {...props}>
    <path d='M510.665143 801.536c13.037714 0 22.253714-7.296 22.253714-20.333714 0-5.76-1.536-8.832-5.76-16.896-46.811429-72.502857-73.289143-155.757714-73.289143-245.924572 0-87.094857 24.941714-174.189714 73.289143-247.076571 4.205714-8.045714 5.76-11.117714 5.76-16.877714 0-12.288-9.216-20.333714-22.253714-20.333715-12.672 0-23.04 5.741714-35.291429 22.637715-57.563429 73.270857-86.710857 164.571429-86.710857 261.266285s27.995429 185.307429 86.692572 260.900572c12.288 16.877714 22.637714 22.637714 35.291428 22.637714z m391.716571 0c12.653714 0 22.637714-5.76 34.925715-22.637714C995.986286 703.305143 1024 614.692571 1024 517.997714c0-96.676571-28.781714-187.977143-86.710857-261.266285-12.269714-16.896-22.253714-22.637714-34.907429-22.637715-13.037714 0-22.253714 8.045714-22.253714 20.333715 0 5.76 1.152 8.813714 5.376 16.877714 48.731429 72.886857 73.654857 160 73.654857 247.076571 0 90.148571-26.843429 173.421714-73.270857 245.942857-4.608 8.045714-5.76 11.117714-5.76 16.877715 0 12.269714 9.216 20.333714 22.253714 20.333714z m-850.578285-0.768c75.190857 0 110.098286-32.237714 128.128-118.564571l43.739428-209.865143h69.449143c22.253714 0 36.443429-11.885714 36.443429-31.085715 0-16.475429-10.733714-26.843429-28.379429-26.843428h-64.841143l10.733714-52.169143c9.984-48.731429 25.325714-68.681143 67.913143-68.681143 6.144 0 12.269714-0.384 16.493715-0.768 19.2-1.92 27.611429-10.752 27.611428-27.245714 0-21.485714-18.011429-31.085714-54.857143-31.085714-73.270857 0-110.866286 36.461714-127.744 118.564571l-13.056 61.385143H115.858286c-22.235429 0-36.827429 11.885714-36.827429 31.085714 0 16.493714 11.136 26.843429 28.781714 26.843429h43.337143L108.982857 673.005714C98.194286 723.254857 82.468571 741.668571 41.435429 741.668571c-5.376 0-10.368 0.384-14.189715 0.768-17.664 2.304-27.245714 11.885714-27.245714 28.013715 0 20.717714 17.645714 30.317714 51.803429 30.317714z m539.044571-100.918857c12.653714 0 21.101714-4.205714 30.683429-18.029714l84.022857-119.698286h1.536l85.942857 121.618286c9.6 13.44 18.797714 16.109714 28.013714 16.109714 18.413714 0 30.701714-13.037714 30.701714-28.763429 0-7.296-2.304-14.189714-7.314285-20.717714l-98.194286-133.522286 98.194286-131.602285c5.010286-6.509714 7.314286-13.421714 7.314285-21.485715 0-16.493714-13.824-27.995429-29.165714-27.995428-13.805714 0-21.869714 6.912-29.165714 18.029714l-80.950857 118.546286h-1.92l-81.334857-118.930286c-7.296-11.136-16.493714-17.645714-31.085715-17.645714-17.645714 0-31.085714 14.189714-31.085714 29.531428 0 11.136 3.090286 18.048 8.466286 24.557715l93.220571 125.074285-98.980571 136.96c-5.76 7.314286-6.912 13.824-6.912 21.504 0 14.957714 12.672 26.459429 28.013714 26.459429z' p-id='7452' fill='#8a8a8a' />
  </Icon>
);

export const TableIcon: React.FC<IconProps> = (props) => (
  <Icon viewBox='0 0 1024 1024' {...props}>
    <path fill='#8a8a8a' d='M928.229 784.149c0 44.024-36.02 80.044-80.044 80.044L175.815 864.193c-44.024 0-80.044-36.02-80.044-80.044L95.771 239.851c0-44.024 36.02-80.044 80.044-80.044l672.369 0c44.024 0 80.044 36.02 80.044 80.044L928.228 784.149zM351.912 303.886c0-9.005-7.004-16.009-16.009-16.009L175.815 287.877c-9.005 0-16.009 7.004-16.009 16.009l0 96.053c0 9.005 7.004 16.009 16.009 16.009l160.088 0c9.005 0 16.009-7.004 16.009-16.009L351.912 303.886zM351.912 495.991c0-9.005-7.004-16.009-16.009-16.009L175.815 479.982c-9.005 0-16.009 7.004-16.009 16.009l0 96.053c0 9.005 7.004 16.009 16.009 16.009l160.088 0c9.005 0 16.009-7.004 16.009-16.009L351.912 495.991zM351.912 688.097c0-9.005-7.004-16.009-16.009-16.009L175.815 672.088c-9.005 0-16.009 7.004-16.009 16.009l0 96.053c0 9.005 7.004 16.009 16.009 16.009l160.088 0c9.005 0 16.009-7.004 16.009-16.009L351.912 688.097zM608.053 303.886c0-9.005-7.004-16.009-16.009-16.009L431.956 287.877c-9.005 0-16.009 7.004-16.009 16.009l0 96.053c0 9.005 7.004 16.009 16.009 16.009l160.088 0c9.005 0 16.009-7.004 16.009-16.009L608.053 303.886zM608.053 495.991c0-9.005-7.004-16.009-16.009-16.009L431.956 479.982c-9.005 0-16.009 7.004-16.009 16.009l0 96.053c0 9.005 7.004 16.009 16.009 16.009l160.088 0c9.005 0 16.009-7.004 16.009-16.009L608.053 495.991zM608.053 688.097c0-9.005-7.004-16.009-16.009-16.009L431.956 672.088c-9.005 0-16.009 7.004-16.009 16.009l0 96.053c0 9.005 7.004 16.009 16.009 16.009l160.088 0c9.005 0 16.009-7.004 16.009-16.009L608.053 688.097zM864.193 303.886c0-9.005-7.004-16.009-16.009-16.009L688.097 287.877c-9.005 0-16.009 7.004-16.009 16.009l0 96.053c0 9.005 7.004 16.009 16.009 16.009l160.088 0c9.005 0 16.009-7.004 16.009-16.009L864.194 303.886zM864.193 495.991c0-9.005-7.004-16.009-16.009-16.009L688.097 479.982c-9.005 0-16.009 7.004-16.009 16.009l0 96.053c0 9.005 7.004 16.009 16.009 16.009l160.088 0c9.005 0 16.009-7.004 16.009-16.009L864.194 495.991zM864.193 688.097c0-9.005-7.004-16.009-16.009-16.009L688.097 672.088c-9.005 0-16.009 7.004-16.009 16.009l0 96.053c0 9.005 7.004 16.009 16.009 16.009l160.088 0c9.005 0 16.009-7.004 16.009-16.009L864.194 688.097z' p-id='5963' />
  </Icon>
);

export const ColumnIcon: React.FC<IconProps> = (props) => (
  <Icon viewBox='0 0 1024 1024' {...props}>
    <path fill='#8a8a8a' d='M128 128l768 0q53.00224 0 90.50112 37.49888t37.49888 90.50112l0 512q0 53.00224-37.49888 90.50112t-90.50112 37.49888l-768 0q-53.00224 0-90.50112-37.49888t-37.49888-90.50112l0-512q0-53.00224 37.49888-90.50112t90.50112-37.49888zM298.65984 810.65984l0-597.34016-170.65984 0q-17.67424 0-30.16704 12.4928t-12.4928 30.16704l0 512q0 17.67424 12.4928 30.16704t30.16704 12.4928l170.65984 0zM640 810.65984l0-597.34016-256 0 0 597.34016 256 0zM896 213.34016l-170.65984 0 0 597.34016 170.65984 0q17.67424 0 30.16704-12.4928t12.4928-30.16704l0-512q0-17.67424-12.4928-30.16704t-30.16704-12.4928z' p-id='5076' />
  </Icon>
);

const HintItem = (props) => {
  const { text = '', type = '' } = props;
  const getSvgAndLabel = (type) => {
    switch (type) {
    case 'keyword': return [<KeywordIcon />, 'keyword'];
    case 'function': return [<FunctionIcon />, 'function'];
    case 'table': return [<TableIcon />, 'table-name'];
    case 'column': return [<ColumnIcon />, 'column-name'];
    }
    return [null, ''];
  };
  const [icon, label] = getSvgAndLabel(type);
  return (
    <Flex alignItems='center'>
      {icon}
      <Box paddingLeft='1rem'>{text}</Box>
      <Box color='#DDE3EE' marginLeft='auto' padding='0 1rem'>{label}</Box>
    </Flex>
  );
};

export default function(CodeMirror) {
  'use strict';

  const HINT_ELEMENT_CLASS = 'CodeMirror-hint';
  const ACTIVE_HINT_ELEMENT_CLASS = 'CodeMirror-hint-active';

  // This is the old interface, kept around for now to stay
  // backwards-compatible.
  CodeMirror.showHint = function(cm, getHints, options) {
    if (!getHints) return cm.showHint(options);
    if (options && options.async) getHints.async = true;
    const newOpts = { hint: getHints };
    if (options) for (const prop in options) newOpts[prop] = options[prop];
    return cm.showHint(newOpts);
  };

  CodeMirror.defineExtension('showHint', function(options) {
    options = parseOptions(this, this.getCursor('start'), options);
    const selections = this.listSelections();
    if (selections.length > 1) return;
    // By default, don't allow completion when something is selected.
    // A hint function can have a `supportsSelection` property to
    // indicate that it can handle selections.
    if (this.somethingSelected()) {
      if (!options.hint.supportsSelection) return;
      // Don't try with cross-line selections
      for (let i = 0; i < selections.length; i++) {
        if (selections[i].head.line != selections[i].anchor.line) return;
      }
    }

    if (this.state.completionActive) this.state.completionActive.close();
    const completion = this.state.completionActive = new Completion(this, options);
    if (!completion.options.hint) return;

    CodeMirror.signal(this, 'startCompletion', this);
    completion.update(true);
  });

  CodeMirror.defineExtension('closeHint', function() {
    if (this.state.completionActive) this.state.completionActive.close();
  });

  function Completion(cm, options) {
    this.cm = cm;
    this.options = options;
    this.widget = null;
    this.debounce = 0;
    this.tick = 0;
    this.startPos = this.cm.getCursor('start');
    this.startLen = this.cm.getLine(this.startPos.line).length - this.cm.getSelection().length;

    if (this.options.updateOnCursorActivity) {
      const self = this;
      cm.on('cursorActivity', this.activityFunc = function() {
        self.cursorActivity();
      });
    }
  }

  const requestAnimationFrame = window.requestAnimationFrame || function(fn) {
    return setTimeout(fn, 1000 / 60);
  };
  const cancelAnimationFrame = window.cancelAnimationFrame || clearTimeout;

  Completion.prototype = {
    close() {
      if (!this.active()) return;
      this.cm.state.completionActive = null;
      this.tick = null;
      if (this.options.updateOnCursorActivity) {
        this.cm.off('cursorActivity', this.activityFunc);
      }

      if (this.widget && this.data) CodeMirror.signal(this.data, 'close');
      if (this.widget) this.widget.close();
      CodeMirror.signal(this.cm, 'endCompletion', this.cm);
    },

    active() {
      return this.cm.state.completionActive == this;
    },

    pick(data, i) {
      // console.log('pick了了了了了了了了了', i);
      const completion = data.list[i]; const
        self = this;
      this.cm.operation(() => {
        if (completion.hint) {
          // console.log('here');
          completion.hint(self.cm, data, completion)}
        else {
          // console.log('elseelselelselelslesleslels');
          self.cm.replaceRange(getText(completion), completion.from || data.from,
            completion.to || data.to, 'complete');
        }
        CodeMirror.signal(data, 'pick', completion);
        self.cm.scrollIntoView();
      });
      if (this.options.closeOnPick) {
        this.close();
      }
    },

    cursorActivity() {
      if (this.debounce) {
        cancelAnimationFrame(this.debounce);
        this.debounce = 0;
      }

      let identStart = this.startPos;
      if (this.data) {
        identStart = this.data.from;
      }

      const pos = this.cm.getCursor(); const
        line = this.cm.getLine(pos.line);
      if (pos.line != this.startPos.line || line.length - pos.ch != this.startLen - this.startPos.ch
            || pos.ch < identStart.ch || this.cm.somethingSelected()
            || (!pos.ch || this.options.closeCharacters.test(line.charAt(pos.ch - 1)))) {
        this.close();
      } else {
        const self = this;
        this.debounce = requestAnimationFrame(() => {
          self.update();
        });
        if (this.widget) this.widget.disable();
      }
    },

    update(first) {
      if (this.tick == null) return;
      const self = this; const
        myTick = ++this.tick;
      fetchHints(this.options.hint, this.cm, this.options, (data) => {
        if (self.tick == myTick) self.finishUpdate(data, first);
      });
    },

    finishUpdate(data, first) {
      if (this.data) CodeMirror.signal(this.data, 'update');

      const picked = (this.widget && this.widget.picked) || (first && this.options.completeSingle);
      if (this.widget) this.widget.close();

      this.data = data;

      if (data && data.list.length) {
        if (picked && data.list.length == 1) {
          this.pick(data, 0);
        } else {
          this.widget = new Widget(this, data);
          CodeMirror.signal(data, 'shown');
        }
      }
    },
  };

  function parseOptions(cm, pos, options) {
    const editor = cm.options.customHintOptions;
    const out = {};
    for (var prop in defaultOptions) out[prop] = defaultOptions[prop];
    if (editor) {
      for (var prop in editor) if (editor[prop] !== undefined) out[prop] = editor[prop];
    }
    if (options) {
      for (var prop in options) if (options[prop] !== undefined) out[prop] = options[prop];
    }
    if (out.hint.resolve) out.hint = out.hint.resolve(cm, pos);
    return out;
  }

  function getText(completion) {
    if (typeof completion === 'string') return completion;
    return completion.text;
  }

  function buildKeyMap(completion, handle) {
    const baseMap = {
      Up() {
        handle.moveFocus(-1);
      },
      Down() {
        handle.moveFocus(1);
      },
      PageUp() {
        handle.moveFocus(-handle.menuSize() + 1, true);
      },
      PageDown() {
        handle.moveFocus(handle.menuSize() - 1, true);
      },
      Home() {
        handle.setFocus(0);
      },
      End() {
        handle.setFocus(handle.length - 1);
      },
      Enter: handle.pick,
      Tab: handle.pick,
      Esc: handle.close,
    };

    const mac = /Mac/.test(navigator.platform);

    if (mac) {
      baseMap['Ctrl-P'] = function() {
        handle.moveFocus(-1);
      };
      baseMap['Ctrl-N'] = function() {
        handle.moveFocus(1);
      };
    }

    const custom = completion.options.customKeys;
    const ourMap = custom ? {} : baseMap;
    function addBinding(key, val) {
      let bound;
      if (typeof val !== 'string') {
        bound = function(cm) {
          return val(cm, handle);
        };
      }
      // This mechanism is deprecated
      else if (baseMap.hasOwnProperty(val)) {
        bound = baseMap[val];
      } else {
        bound = val;
      }
      ourMap[key] = bound;
    }
    if (custom) {
      for (var key in custom) {
        if (custom.hasOwnProperty(key)) addBinding(key, custom[key]);
      }
    }
    const extra = completion.options.extraKeys;
    if (extra) {
      for (var key in extra) {
        if (extra.hasOwnProperty(key)) addBinding(key, extra[key]);
      }
    }
    return ourMap;
  }

  function getHintElement(hintsElement, el) {
    while (el && el != hintsElement) {
      if (el.nodeName.toUpperCase() === 'LI' && el.parentNode == hintsElement) return el;
      el = el.parentNode;
    }
  }

  // const HintList = (props) => {
  //   const {left, top, id, selectedIndex, completions, theme} = props;
  //   return <UnorderedList id={id} left={left} top={top} role='listbox' aria-expanded={true} className={`CodeMirror-hints ${theme}`}>
  //     {completions.map((item, index) => {
  //       return (<ListItem role='option' id={`${id}-${index}`} hintId={index} key={`${id}-${index}`} aria-selected={selectedIndex === index} className={`${HINT_ELEMENT_CLASS + (index != selectedIndex ? "" : " " + ACTIVE_HINT_ELEMENT_CLASS)} ${item['className'] ?? ''}`} >
  //       <HintItem text={item.displayText || getText(item)} type={last(split('-', item.className))} />
  //     </ListItem>)
  //     })}
  //   </UnorderedList>

  function fuzzysearch(needle, haystack) {
    const tlen = haystack.length;
    const qlen = needle.length;
    if (qlen > tlen) {
      return [-1];
    }
    if (qlen === tlen && needle === haystack) {
      return range(0, qlen);
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
      return [-1];
    }
    // console.log('pos', pos);
    return pos;
  }
  
  function getTypeName(type) {
    switch (type) {
    case 'keyword': return 'keyword';
    case 'function': return 'function';
    case 'table': return 'table-name';
    case 'column': return 'column-name';
    default: return '';
    }
  }

  function Widget(completion, data) {
    this.id = `cm-complete-${Math.floor(Math.random(1e6))}`;
    this.completion = completion;
    this.data = data;
    this.picked = false;
    const widget = this; const
      cm = completion.cm;
    const ownerDocument = cm.getInputField().ownerDocument;
    const parentWindow = ownerDocument.defaultView || ownerDocument.parentWindow;
    console.log('cm', cm);

    const hints = this.hints = ownerDocument.createElement('ul');
    hints.setAttribute('role', 'listbox');
    hints.setAttribute('aria-expanded', 'true');
    hints.id = this.id;
    const theme = completion.cm.options.theme;
    hints.className = `CodeMirror-hints ${theme}`;
    this.selectedHint = data.selectedHint || 0;

    const completions = data.list;
    const fragment = document.createDocumentFragment();
    let previousType = '';
    // console.log('completionscompletionscompletions', completions);
    for (let i = 0; i < completions.length; ++i) {
      const elt = fragment.appendChild(ownerDocument.createElement('li'));
      const cur = completions[i];
      let className = HINT_ELEMENT_CLASS + (i != this.selectedHint ? '' : ` ${ACTIVE_HINT_ELEMENT_CLASS}`);
      if (cur.className != null) className = `${cur.className} ${className}`;
      elt.className = className;
      if (i == this.selectedHint) elt.setAttribute('aria-selected', 'true');
      elt.id = `${this.id}-${i}`;
      elt.setAttribute('role', 'option');
      const [type, search] = split(/\s/, cur.className);
      if (cur.render) cur.render(elt, data, cur);
      else {
        const hintText = cur.displayText || getText(cur);
        // console.log('cur.className', cur.className);
        const indexs = fuzzysearch(search.toUpperCase(), hintText.toUpperCase());
        // // console.log('currentInput', currentInput, indexs);
        const hintNode = ownerDocument.createDocumentFragment();
        if (indexs.length > 0) {
          let i = 0, j = -1;
          for (; i < indexs.length; ++i) {
            if (j == -1) {
              if (indexs[i] !== 0) {
                const TextNode = ownerDocument.createElement('span');
                TextNode.appendChild(ownerDocument.createTextNode(hintText.substring(0, indexs[i])));
                hintNode.appendChild(TextNode);
              }
              const singleTextNode = ownerDocument.createElement('span');
              singleTextNode.appendChild(ownerDocument.createTextNode(hintText.substring(indexs[i], indexs[i] + 1)));
              singleTextNode.className = 'highlight';
              hintNode.appendChild(singleTextNode);
            } else {
              if (indexs[i] !== j + 1){
                const TextNode = ownerDocument.createElement('span');
                TextNode.appendChild(ownerDocument.createTextNode(hintText.substring(j + 1, indexs[i])));
                hintNode.appendChild(TextNode);
              }
              const singleTextNode = ownerDocument.createElement('span');
              singleTextNode.appendChild(ownerDocument.createTextNode(hintText.substring(indexs[i], indexs[i] + 1)));
              singleTextNode.className = 'highlight';
              hintNode.appendChild(singleTextNode);
            }
            j = indexs[i];
          }
          if (j < hintText.length) {
            const TextNode = ownerDocument.createElement('span');
            TextNode.appendChild(ownerDocument.createTextNode(hintText.substring(j + 1, hintText.length)));
            hintNode.appendChild(TextNode);
          }
        } else {
          const TextNode = ownerDocument.createElement('span');
            TextNode.appendChild(ownerDocument.createTextNode(hintText));
            hintNode.appendChild(TextNode);
        }
        // range(0, (hintText.length)).forEach((item, index) => {
        //   const singleTextNode = ownerDocument.createElement('i');
        //   singleTextNode.appendChild(ownerDocument.createTextNode(hintText[item]));
        //   // const singleTextNode = ownerDocument.createTextNode(hintText[item]);
        //   if (indexs.length > 0 && indexs[0] !== -1 && indexs.includes(index)) {
        //     singleTextNode.className = 'highlight';
        //   }
        //   hintNode.appendChild(singleTextNode)
        // });
        elt.appendChild(hintNode);
        // console.log('hintNodehintNodehintNode', hintNode.children);
        // elt.appendChild(ownerDocument.createTextNode(cur.displayText || getText(cur)));
        // const justType = last(split('-', type));
        // if (justType === 'table' || justType === 'column') {
        //   const typeNode = ownerDocument.createElement('span');
        //   typeNode.className = 'type';
        //   typeNode.appendChild(ownerDocument.createTextNode(getTypeName(justType)));
        //   elt.appendChild(typeNode);
        // }
        // previousType = type;
        // elt.appendChild(ownerDocument.createTextNode(cur.displayText || getText(cur)));
        // elt.appendChild(ownerDocument.createTextNode('xxx'));
        // ReactDOM.render(<HintItem text={cur.displayText || getText(cur)} type={last(split('-', cur.className))} />, elt);
      }
      elt.hintId = i;
      // if (search === 'ad_l') {
      //   debugger;
      // }
    }
    hints.appendChild(fragment);
    const container = completion.options.container || ownerDocument.body;
    let pos = cm.cursorCoords(completion.options.alignWithWord ? data.from : null);
    let left = pos.left; let top = pos.bottom; let
      below = true;
    let offsetLeft = 0; let
      offsetTop = 0;
    if (container !== ownerDocument.body) {
      // We offset the cursor position because left and top are relative to the offsetParent's top left corner.
      const isContainerPositioned = ['absolute', 'relative', 'fixed'].indexOf(parentWindow.getComputedStyle(container).position) !== -1;
      const offsetParent = isContainerPositioned ? container : container.offsetParent;
      const offsetParentPosition = offsetParent.getBoundingClientRect();
      const bodyPosition = ownerDocument.body.getBoundingClientRect();
      offsetLeft = (offsetParentPosition.left - bodyPosition.left - offsetParent.scrollLeft);
      offsetTop = (offsetParentPosition.top - bodyPosition.top - offsetParent.scrollTop);
    }
    hints.style.left = `${left - offsetLeft}px`;
    hints.style.top = `${top - offsetTop}px`;
    // hints.style.left = `100px`;
    // hints.style.top = `100px`;
    // hints.style.position = 'fixed'

    // If we're at the edge of the screen, then we want the menu to appear on the left of the cursor.
    const winW = parentWindow.innerWidth || Math.max(ownerDocument.body.offsetWidth, ownerDocument.documentElement.offsetWidth);
    const winH = parentWindow.innerHeight || Math.max(ownerDocument.body.offsetHeight, ownerDocument.documentElement.offsetHeight);
    container.appendChild(hints);
    cm.getInputField().setAttribute('aria-autocomplete', 'list');
    cm.getInputField().setAttribute('aria-owns', this.id);
    cm.getInputField().setAttribute('aria-activedescendant', `${this.id}-${this.selectedHint}`);

    let box = completion.options.moveOnOverlap ? hints.getBoundingClientRect() : new DOMRect();
    const scrolls = completion.options.paddingForScrollbar ? hints.scrollHeight > hints.clientHeight + 1 : false;

    // Compute in the timeout to avoid reflow on init
    let startScroll;
    setTimeout(() => {
      startScroll = cm.getScrollInfo();
    });

    const overlapY = box.bottom - winH;
    if (overlapY > 0) {
      const height = box.bottom - box.top; const
        curTop = pos.top - (pos.bottom - box.top);
      if (curTop - height > 0) { // Fits above cursor
        hints.style.top = `${top = pos.top - height - offsetTop}px`;
        below = false;
      } else if (height > winH) {
        hints.style.height = `${winH - 5}px`;
        hints.style.top = `${top = pos.bottom - box.top - offsetTop}px`;
        const cursor = cm.getCursor();
        if (data.from.ch != cursor.ch) {
          pos = cm.cursorCoords(cursor);
          hints.style.left = `${left = pos.left - offsetLeft}px`;
          box = hints.getBoundingClientRect();
        }
      }
    }
    let overlapX = box.right - winW;
    if (scrolls) overlapX += cm.display.nativeBarWidth;
    if (overlapX > 0) {
      if (box.right - box.left > winW) {
        hints.style.width = `${winW - 5}px`;
        overlapX -= (box.right - box.left) - winW;
      }
      hints.style.left = `${left = pos.left - overlapX - offsetLeft}px`;
    }
    if (scrolls) {
      for (let node = hints.firstChild; node; node = node.nextSibling) node.style.paddingRight = `${cm.display.nativeBarWidth}px`;
    }

    cm.addKeyMap(this.keyMap = buildKeyMap(completion, {
      moveFocus(n, avoidWrap) {
        widget.changeActive(widget.selectedHint + n, avoidWrap);
      },
      setFocus(n) {
        widget.changeActive(n);
      },
      menuSize() {
        return widget.screenAmount();
      },
      length: completions.length,
      close() {
        completion.close();
      },
      pick() {
        widget.pick();
      },
      data,
    }));

    if (completion.options.closeOnUnfocus) {
      let closingOnBlur;
      cm.on('blur', this.onBlur = function() {
        closingOnBlur = setTimeout(() => {
          completion.close();
        }, 100);
      });
      cm.on('focus', this.onFocus = function() {
        clearTimeout(closingOnBlur);
      });
    }

    cm.on('scroll', this.onScroll = function() {
      const curScroll = cm.getScrollInfo(); const
        editor = cm.getWrapperElement().getBoundingClientRect();
      if (!startScroll) startScroll = cm.getScrollInfo();
      const newTop = top + startScroll.top - curScroll.top;
      let point = newTop - (parentWindow.pageYOffset || (ownerDocument.documentElement || ownerDocument.body).scrollTop);
      if (!below) point += hints.offsetHeight;
      if (point <= editor.top || point >= editor.bottom) return completion.close();
      hints.style.top = `${newTop}px`;
      hints.style.left = `${left + startScroll.left - curScroll.left}px`;
    });

    CodeMirror.on(hints, 'dblclick', (e) => {
      const t = getHintElement(hints, e.target || e.srcElement);
      if (t && t.hintId != null) {
        widget.changeActive(t.hintId); widget.pick();
      }
    });

    CodeMirror.on(hints, 'click', (e) => {
      const t = getHintElement(hints, e.target || e.srcElement);
      if (t && t.hintId != null) {
        widget.changeActive(t.hintId);
        if (completion.options.completeOnSingleClick) widget.pick();
      }
    });

    CodeMirror.on(hints, 'mousedown', () => {
      setTimeout(() => {
        cm.focus();
      }, 20);
    });

    // The first hint doesn't need to be scrolled to on init
    const selectedHintRange = this.getSelectedHintRange();
    if (selectedHintRange.from !== 0 || selectedHintRange.to !== 0) {
      this.scrollToActive();
    }

    CodeMirror.signal(data, 'select', completions[this.selectedHint], hints.childNodes[this.selectedHint]);
    return true;
  }

  Widget.prototype = {
    close() {
      if (this.completion.widget != this) return;
      this.completion.widget = null;
      if (this.hints.parentNode) this.hints.parentNode.removeChild(this.hints);
      this.completion.cm.removeKeyMap(this.keyMap);
      const input = this.completion.cm.getInputField();
      input.removeAttribute('aria-activedescendant');
      input.removeAttribute('aria-owns');

      const cm = this.completion.cm;
      if (this.completion.options.closeOnUnfocus) {
        cm.off('blur', this.onBlur);
        cm.off('focus', this.onFocus);
      }
      cm.off('scroll', this.onScroll);
    },

    disable() {
      this.completion.cm.removeKeyMap(this.keyMap);
      const widget = this;
      this.keyMap = {
        Enter() {
          widget.picked = true;
        },
      };
      this.completion.cm.addKeyMap(this.keyMap);
    },

    pick() {
      this.completion.pick(this.data, this.selectedHint);
    },

    changeActive(i, avoidWrap) {
      if (i >= this.data.list.length) i = avoidWrap ? this.data.list.length - 1 : 0;
      else if (i < 0) i = avoidWrap ? 0 : this.data.list.length - 1;
      if (this.selectedHint == i) return;
      let node = this.hints.childNodes[this.selectedHint];
      if (node) {
        node.className = node.className.replace(` ${ACTIVE_HINT_ELEMENT_CLASS}`, '');
        node.removeAttribute('aria-selected');
      }
      node = this.hints.childNodes[this.selectedHint = i];
      node.className += ` ${ACTIVE_HINT_ELEMENT_CLASS}`;
      node.setAttribute('aria-selected', 'true');
      this.completion.cm.getInputField().setAttribute('aria-activedescendant', node.id);
      this.scrollToActive();
      CodeMirror.signal(this.data, 'select', this.data.list[this.selectedHint], node);
    },

    scrollToActive() {
      const selectedHintRange = this.getSelectedHintRange();
      const node1 = this.hints.childNodes[selectedHintRange.from];
      const node2 = this.hints.childNodes[selectedHintRange.to];
      const firstNode = this.hints.firstChild;
      if (node1.offsetTop < this.hints.scrollTop) this.hints.scrollTop = node1.offsetTop - firstNode.offsetTop;
      else if (node2.offsetTop + node2.offsetHeight > this.hints.scrollTop + this.hints.clientHeight) this.hints.scrollTop = node2.offsetTop + node2.offsetHeight - this.hints.clientHeight + firstNode.offsetTop;
    },

    screenAmount() {
      return Math.floor(this.hints.clientHeight / this.hints.firstChild.offsetHeight) || 1;
    },

    getSelectedHintRange() {
      const margin = this.completion.options.scrollMargin || 0;
      return {
        from: Math.max(0, this.selectedHint - margin),
        to: Math.min(this.data.list.length - 1, this.selectedHint + margin),
      };
    },
  };

  function applicableHelpers(cm, helpers) {
    if (!cm.somethingSelected()) return helpers;
    const result = [];
    for (let i = 0; i < helpers.length; i++) {
      if (helpers[i].supportsSelection) result.push(helpers[i]);
    }
    return result;
  }

  function fetchHints(hint, cm, options, callback) {
    if (hint.async) {
      hint(cm, callback, options);
    } else {
      const result = hint(cm, options);
      if (result && result.then) result.then(callback);
      else callback(result);
    }
  }

  function resolveAutoHints(cm, pos) {
    const helpers = cm.getHelpers(pos, 'hint'); let
      words;
    if (helpers.length) {
      const resolved = function(cm, callback, options) {
        const app = applicableHelpers(cm, helpers);
        function run(i) {
          if (i == app.length) return callback(null);
          fetchHints(app[i], cm, options, (result) => {
            if (result && result.list.length > 0) callback(result);
            else run(i + 1);
          });
        }
        run(0);
      };
      resolved.async = true;
      resolved.supportsSelection = true;
      return resolved;
    } if (words = cm.getHelper(cm.getCursor(), 'hintWords')) {
      return function(cm) {
        return CodeMirror.hint.fromList(cm, { words });
      };
    } if (CodeMirror.hint.anyword) {
      return function(cm, options) {
        return CodeMirror.hint.anyword(cm, options);
      };
    }
    return function() {};
  }

  CodeMirror.registerHelper('hint', 'auto', { resolve: resolveAutoHints });

  CodeMirror.registerHelper('hint', 'fromList', (cm, options) => {
    const cur = cm.getCursor(); const
      token = cm.getTokenAt(cur);
    let term; let from = CodeMirror.Pos(cur.line, token.start); const
      to = cur;
    if (token.start < cur.ch && /\w/.test(token.string.charAt(cur.ch - token.start - 1))) {
      term = token.string.substr(0, cur.ch - token.start);
    } else {
      term = '';
      from = cur;
    }
    const found = [];
    for (let i = 0; i < options.words.length; i++) {
      const word = options.words[i];
      if (word.slice(0, term.length) == term) found.push(word);
    }

    if (found.length) {
      return {
        list: found,
        from,
        to,
      };
    }
  });

  CodeMirror.commands.autocomplete = CodeMirror.showHint;

  var defaultOptions = {
    hint: CodeMirror.hint.auto,
    completeSingle: true,
    alignWithWord: true,
    closeCharacters: /[\s()\[\]{};:>,]/,
    closeOnPick: true,
    closeOnUnfocus: true,
    updateOnCursorActivity: true,
    completeOnSingleClick: true,
    container: null,
    customKeys: null,
    extraKeys: null,
    paddingForScrollbar: true,
    moveOnOverlap: true,
  };

  CodeMirror.defineOption('customHintOptions', null);
}
