function OnScrollEvent() {
  document.documentElement.scrollTop = 0;
}

function MakeWindowScrollbarVisibleIfNeeded() {
  document.querySelector("body.mdc-dialog-scroll-lock")?.classList.remove("mdc-dialog-scroll-lock");
}

async function downloadFileFromStream(fileName, contentStreamReference) {
  const arrayBuffer = await contentStreamReference.arrayBuffer();
  const blob = new Blob([arrayBuffer]);

  const url = URL.createObjectURL(blob);

  triggerFileDownload(fileName, url);

  URL.revokeObjectURL(url);
}

function triggerFileDownload(fileName, url) {
  const anchorElement = document.createElement('a');
  anchorElement.href = url;

  if (fileName) {
    anchorElement.download = fileName;
  }

  anchorElement.click();
  anchorElement.remove();
}