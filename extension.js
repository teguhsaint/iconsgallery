const vscode = require("vscode");
const path = require("path");
/**
 * @param {vscode.ExtensionContext} context
 */

class IconGalleryProvider {
  constructor(context) {
    this._context = context;
  }

  async resolveWebviewView(webviewView) {
    this._view = webviewView;
    this._view.webview.options = {
      enableScripts: true,
    };
    this._view.webview.html = await getWebViewContent(this._view.webview, this._context);
    this._view.webview.onDidReceiveMessage((message) => {
      var element = ``;

      console.log(message);
      if (message.kategori == "fas") {
        element = `<i class="${message.data}"></i>`;
        vscode.env.clipboard.writeText(element);
        vscode.window.setStatusBarMessage(`${message.data} copied!`, 2000);
      }
      if (message.kategori == "fab") {
        element = `<i class="${message.data}"></i>`;
        vscode.env.clipboard.writeText(element);
        vscode.window.setStatusBarMessage(`${message.data} copied!`, 2000);
      }
      if (message.kategori == "feather") {
        element = `<i data-feather="${message.data2}"></i>`;
        vscode.env.clipboard.writeText(element);
        vscode.window.setStatusBarMessage(`${message.data2} copied!`, 2000);
      }
      if (message.kategori == "bi") {
        element = `<i class="${message.data}"></i>`;
        vscode.env.clipboard.writeText(element);
        vscode.window.setStatusBarMessage(`${message.data} copied!`, 2000);
      }
    });
  }
}

async function getWebViewContent(web, context) {
  const bs = vscode.Uri.file(path.join(context.extensionPath, "libs/bootstrap.min.css"));
  const bundl = vscode.Uri.file(path.join(context.extensionPath, "libs/bootstrap.bundle.min.js"));
  const fsj = vscode.Uri.file(path.join(context.extensionPath, "libs/fa.js"));
  const jsa = vscode.Uri.file(path.join(context.extensionPath, "libs/jquery.min.js"));
  const fabf = vscode.Uri.file(path.join(context.extensionPath, "libs/fab.js"));
  const fth = vscode.Uri.file(path.join(context.extensionPath, "libs/fth.js"));
  const bi = vscode.Uri.file(path.join(context.extensionPath, "libs/bi.js"));

  const bootstrapUri = web.asWebviewUri(bs);
  const bootstrapUriBundle = web.asWebviewUri(bundl);
  const jqui = web.asWebviewUri(jsa);
  const faUri = web.asWebviewUri(fsj);
  const fabUri = web.asWebviewUri(fabf);
  const fthUri = web.asWebviewUri(fth);
  const biUri = web.asWebviewUri(bi);

  const myhtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Blank</title>
    <link rel="stylesheet" href="${bootstrapUri}"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" />
  <script src="https://unpkg.com/feather-icons"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css">

    <style>
  select,input{
    font-size:13px!important;
  }
  option:hover {
  background-color: transparent!important;
}
  </style>
    </head>

  <body class='bg-transparent text-white '>
  <div class='w-100 p-3 bg-dark fixed-top'>
  <select class='p-1 px-2  mb-2 form-select bg-dark  shadow-none text-white border-secondary rounded-0'>
  <option value='fa'>Font Awesome V6 Free</option>
  <option value='fth'>Feather Icons</option>
  <option value='bi'>Bootstrap Icons</option>
  </select>
  <input id="search" class='p-1 px-2 form-control bg-transparent shadow-none text-white border-secondary rounded-0' placeholder='Search Icons'>
  </div>
  <br><br><br><br><br>
  <div class='row g-1' id='row'>
  </div>
<br><br><br>
  <script src="${bootstrapUriBundle}"></script>
  <script src="${jqui}"></script>
  <script src="${fthUri}"></script>
  <script src="${faUri}"></script>
  <script src="${fabUri}"></script>
  <script src="${biUri}"></script>
  <script>
  const vscode = acquireVsCodeApi();

  $('select').change(function(){
    $('#row').html("")

    var pilih=$(this).val()
    if(pilih=='fa'){
      fa_call()
    }
    if(pilih=='fth'){
      fth_call()
    }
    if(pilih=='bi'){
      bi_call()
    }
  })
  </script>

<script>
function bi_call(){
      bi.forEach(ee => {
        $('#row').append('<div class="col-4 text-center" data-icon="'+ee+'" data-kategori="bi"><button data-kategori="bi" onclick="clickMe(this)" style="background-color:#ffffff04" class="py-3 btn btn-dark w-100 btn-sm"><i class="bi bi-'+ee+'" style="font-size:25px"></i><br><textaera class="mt-3 w-100" style="display:block;height:20px;width:100%;white-space: nowrap;overflow:hidden;font-size:10px">'+ee+'</textaera></button></div>')
      })
      check_inputs()

    }
</script>

<script>
function fth_call(){
  fth.forEach(ee => {
    $('#row').append('<div class="col-4 text-center" data-icon="'+ee+'" data-kategori="feather"><button data-icon="'+ee+'" data-kategori="feather" onclick="clickMe(this)" style="background-color:#ffffff04" class="py-3 btn btn-dark w-100 btn-sm"><i data-feather="'+ee+'" style="font-size:25px"></i><br><textaera class="mt-3 w-100" style="display:block;height:20px;width:100%;white-space: nowrap;overflow:hidden;font-size:10px">'+ee+'</textaera></button></div>')

  })
  
  feather.replace()
  check_inputs()

}
</script>

  <script>
  function fa_call(){
      accessible.forEach(ee => {
        $('#row').append('<div class="col-4 text-center" data-icon="'+ee+'" data-kategori="fas"><button data-kategori="fas" onclick="clickMe(this)" style="background-color:#ffffff04" class="py-3 btn btn-dark w-100 btn-sm"><i class="fas '+ee+'" style="font-size:25px"></i><br><textaera class="mt-3 w-100" style="display:block;height:20px;width:100%;white-space: nowrap;overflow:hidden;font-size:10px">'+ee+'</textaera></button></div>')
      })
    
      fabs.forEach(ee => {
        $('#row').append('<div class="col-4 text-center" data-icon="'+ee+'" data-kategori="fab"><button data-kategori="fab" onclick="clickMe(this)" style="background-color:#ffffff04" class="py-3 btn btn-dark w-100 btn-sm"><i class="fab '+ee+'" style="font-size:25px"></i><br><textaera class="mt-3 w-100" style="display:block;height:20px;width:100%;white-space: nowrap;overflow:hidden;font-size:10px">'+ee+'</textaera></button></div>')
      })
        check_inputs()

  }
  fa_call()

  </script>

  <script>
  $('#search').on('input', function() {
  var searchTerm = $.trim(this.value);
  $('.col-4').each(function() {
    if (searchTerm.length < 1) {
      $(this).show();
    } else {
      $(this).toggle($(this).filter('[data-icon*="' + searchTerm + '"], [data-icon*="' + searchTerm + '"]').length > 0);
    }
  });
  })
  </script>


  <script>
 function check_inputs(){    

    var searchTerm = $.trim($('#search').val());
      console.log(searchTerm.length)
    if(searchTerm.length>0){
      $('.col-4').each(function() {
        if (searchTerm.length < 1) {
          $(this).show();
        } else {
          $(this).toggle($(this).filter('[data-icon*="' + searchTerm + '"], [data-icon*="' + searchTerm + '"]').length > 0);
        }
      });
    }
 }
  
  
  </script>

  <script>
        function clickMe(buttonssss){
          var text_icon = $(buttonssss).find('i').attr('class');
          var text_icon2 = $(buttonssss).attr('data-icon');

          vscode.postMessage({data2:text_icon2,data:text_icon,kategori:$(buttonssss).attr('data-kategori')})
        }
  </script>
   
  </body>
</html>
`;

  return myhtml;
}

function activate(context) {
  context.subscriptions.push(vscode.window.registerWebviewViewProvider("iconsgallery-sidebar", new IconGalleryProvider(context)));
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
