window.addEventListener("load", function() {
  const submit = document.getElementById("submit");
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
      function buildHTML(XHR){
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
      const list = document.getElementById("list");
      const formText = document.getElementById("content");
      list.insertAdjacentHTML("afterend", buildHTML(XHR));
      formText.value = "";
    };
  });
})