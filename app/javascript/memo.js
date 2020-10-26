window.addEventListener("load", function() {
  // 変数定義
  const submit = document.getElementById("submit");

  // 関数定義
  const buildHTML = (XHR) => {
    const item = XHR.response.post;
    const html = `
      <div class="post" data-id=${item.id}>
        <div class="post-date">
          投稿日時：${item.created_at}
        </div>
        <div class="post-content">
          ${item.content}
        </div>
      </div>`;
    return html
  }

  // イベント発火
  submit.addEventListener("click", (e) => {
    e.preventDefault();
    const form = document.getElementById("form")
    const formData = new FormData(form);
    const XHR = new XMLHttpRequest();
    XHR.open("POST", "/posts", true);
    XHR.responseType = "json";
    XHR.send(formData);
    XHR.onload = () => {
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }
      const list = document.getElementById("list");
      const formText = document.getElementById("content");
      list.insertAdjacentHTML("afterend", buildHTML(XHR));
      formText.value = "";
    };
  });
})