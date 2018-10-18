'use babel';

import WebviewView from './webview-view';
import { CompositeDisposable } from 'atom';

export default {

  webviewView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.webviewView = new WebviewView(state.webviewViewState);

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'webview:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
    this.webviewView.destroy();
  },

  serialize() {
    return {
      webviewViewState: this.webviewView.serialize()
    };
  },

  toggle() {
    console.log('Webview was toggled!');
    const activePane = atom.workspace.getActivePane();
    activePane.addItem(this.webviewView);
  }

};
