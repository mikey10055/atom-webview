'use babel';

import WebviewView from './webview-view';
import { CompositeDisposable } from 'atom';

export default {

  webviewView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.state = state;
    this.webviews = [];
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'webview:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
    this.webviews.forEach( wv => {
      wv.destroy();
    })
  },

  serialize() {
    return {
      webviewViewState: this.webviews.map(wv => wv.serialize())
    };
  },

  toggle() {
    const webView = new WebviewView(this.state);
    this.webviews.push(webView);
    const activePane = atom.workspace.getActivePane();
    activePane.addItem(webView);
  }

};
