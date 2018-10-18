'use babel';

export default class WebviewView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('webview');

    // Create message element

    const main = document.createElement("div");
    const menu = document.createElement("div");
    const input = document.createElement("input");
    const button = document.createElement("button");
    const webview = document.createElement("webview");

    main.classList.add("wv-main", "native-key-bindings");
    menu.classList.add("wv-menu", "naive-key-bindings");
    input.classList.add("wv-input", "native-key-bindings");
    button.classList.add("wv-button", "native-key-bindings");
    webview.classList.add("wv-webview", "native-key-bindings");

    button.innerHTML = "Search";
    input.placeholder = "https://"

    const loadUrlIntoWebview = (url) => {
        webview.loadURL(url);
    }

    const updateInputValue = (value) => {
        input.value = value;
    }

    input.addEventListener("keypress", (evt) => {
        if (evt.charCode == 13) {
            loadUrlIntoWebview(input.value);
        }
    });

    button.addEventListener("click", () => {
        loadUrlIntoWebview(input.value);
    });

    webview.addEventListener("did-navigate", (evt) => {
        updateInputValue(evt.url)
    });

    webview.addEventListener("did-navigate-in-page", (evt) => {
        updateInputValue(evt.url)
    });

    menu.appendChild(input);
    menu.appendChild(button);
    main.appendChild(menu);
    main.appendChild(webview);

    this.element.appendChild(main);
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

  getTitle() {
      return "Webview";
  }

}
