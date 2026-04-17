let codigoActual = "";

function comprar(codigo, nombre, precio) {
  codigoActual = codigo;

  JsBarcode("#barcode", codigo, {
    format: "CODE128",
    width: 2,
    height: 80,
    displayValue: true
  });

  alert("Producto: " + nombre + "\nPrecio: S/" + precio + "\nCódigo generado ✔");
}

function descargarBarcode() {
  if (!codigoActual) {
    alert("Primero genera un código");
    return;
  }

  const svg = document.querySelector("svg");
  const data = new XMLSerializer().serializeToString(svg);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const img = new Image();
  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    const link = document.createElement("a");
    link.download = codigoActual + ".png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  img.src = "data:image/svg+xml;base64," + btoa(data);
}
