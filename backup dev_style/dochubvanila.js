// Test Function
function testFunction(args1){
    if (args1.indexOf("nonAccess_") === 0) {
        console.log('Anda tidak memiliki akses');
        document.getElementsByClassName('liFolder')[0].style.display = 'none';
        var modal = document.getElementById("universalModal");
        modal.style.display ='block';
        var reqmodal = document.getElementsByClassName("kontenModal")[2];
        reqmodal.style.display ='block';
    }

}

// Global Page Variable
var pageInfo = _spPageContextInfo;
var domain = pageInfo.siteAbsoluteUrl.slice(0, pageInfo.siteAbsoluteUrl.indexOf('site') - 1);

// Startup Function
$("textarea").keydown(function(e){
    if (e.keyCode == 13)
    {
        e.preventDefault();
    }
});

// Favicon
function changeFavicon() {
    let fav = document.getElementById("favicon");
    fav.setAttribute('href', "https://dokumen.bi.go.id/sites/Workspace_Dev/WebPart/asset/image/logo-dive(short).png");
}

function getScreen() {
    console.log(screen.height);
    console.log(screen.width);
}
window.onload = changeFavicon;
window.onload = getScreen;

// START Menu

// MenuFocus
// var folderBox = false;
async function menuFocus(idmenu) {
    // if(folderBox == false){
    //     document.getElementById("boxFolder").style.transform = "translate(18vw,0)"
    // }
    if (document.getElementsByClassName("buttonMenu-isselected")[0]) {
        document.getElementsByClassName("buttonMenu-isselected")[0].className = "buttonMenu";
        document.getElementById(idmenu).className = "buttonMenu-isselected";
    }
    if (!document.getElementsByClassName("buttonMenu-isselected")[0]) {
        document.getElementById(idmenu).className = "buttonMenu-isselected";
    }
    if (idmenu.indexOf("nonAccess_") === -1) {
        console.log('Akses OK');
        var idMenuFolder = await clickFolderMenu(domain + idmenu);
        if (idMenuFolder == true) {
            document.getElementsByClassName('liFolder')[0].style.display = 'block'
            document.getElementById(domain + idmenu).click();
        }
        if (idMenuFolder == false) {
            alert('Folder tidak dapat di load');
        }
    } else if (idmenu.indexOf("nonAccess_") === 0) {
        console.log('Anda tidak memiliki akses');
        document.getElementsByClassName('liFolder')[0].style.display = 'none'
    }
}

//Check Folder For 3 click
async function clickFolderMenu(checkIDFolder){
    return new Promise((resolve) => {
    var idExist = false;

    for (let limit = 0; limit < 6; limit++) {
    setTimeout(function () {
        if (document.getElementById(checkIDFolder)) {
        idExist = true;
        resolve(idExist);
        }
        if (limit == 5) {
        resolve(idExist);
        }
    }, 500 * limit)

    }
})
}
// END Menu

// START Folder
function folderFocus(idfolder, searching) {
    var idpath = "Path_" + idfolder;
    if (searching == true) {
        if (document.getElementsByClassName("resultFolder-isselected")[0]) {
            document.getElementsByClassName("resultFolder-isselected")[0].className = "resultFolder";
            document.getElementsByClassName("pathFolder-isselected")[0].className = "pathFolder";
            document.getElementById(idfolder).className = "resultFolder-isselected";
            document.getElementById(idpath).className = "pathFolder-isselected";

        }
        if (!document.getElementsByClassName("resultFolder-isselected")[0]) {
            document.getElementById(idfolder).className = "resultFolder-isselected";
            document.getElementById(idpath).className = "pathFolder-isselected";

        }
    }
    if (searching == false) {
        if (document.getElementsByClassName("buttonFolder-isselected")[0]) {
            document.getElementsByClassName("buttonFolder-isselected")[0].className = "buttonFolder";
            document.getElementById(idfolder).className = "buttonFolder-isselected";
        }
        if (!document.getElementsByClassName("buttonFolder-isselected")[0]) {
            document.getElementById(idfolder).className = "buttonFolder-isselected";
        }
    }
}
// END Folder

// START Navigating
function fileFocus(idFile) {
    if (document.getElementsByClassName("containerFile-isselected")[0]) {
        document.getElementsByClassName("containerFile-isselected")[0].className = "containerFile";
        document.getElementById(idFile).className = "containerFile-isselected";
    }
    if (!document.getElementsByClassName("containerFile-isselected")[0]) {
        document.getElementById(idFile).className = "containerFile-isselected";
    }
}

// Collapsible
function openMetadata(idButton) {
    //  Ganti Mata
    var button = document.getElementById(idButton);
    console.log('INI BOSS =' + button.classList.contains('metadataOpen'))
    if (!button.classList.contains("metadataOpen")) {
        console.log('KE TRIGGER FALSE');
        button.classList.add("metadataOpen");
        button.innerHTML = "<img class='iconbuttonFile' src='https://dokumen.bi.go.id/sites/Workspace_Dev/WebPart/asset/image/hide.png'>";
    } else if (button.classList.contains("metadataOpen")) {
        console.log('KE TRIGGER TRUE')
        button.classList.remove("metadataOpen");
        button.innerHTML = "<img class='iconbuttonFile' src='https://dokumen.bi.go.id/sites/Workspace_Dev/WebPart/asset/image/showMetadata.png'>";
    }

    // Show Collapsible
    var content = document.getElementById(idButton.replace("btnmetadata_", "divcollapsible_"));
    console.log(content);
    if (content.style.maxHeight) {
        content.style.maxHeight = null;
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
    }
}
// END Navigating

// START Cataloging
var basicCatalog = document.getElementById("basicCatalog");
var advCatalog = document.getElementById("advanceCatalog");

function bukaCatalog() {
    if (window.getComputedStyle(basicCatalog, null).display == "none") {
        basicCatalog.style.display = "table-cell"
    } else if (window.getComputedStyle(basicCatalog, null).display != "none") {
        basicCatalog.style.display = "none"
        advCatalog.style.display = "none"
    }
}

function advanceCatalog() {
    advCatalog.style.display = "table-cell"
}
// END Cataloging

// START Modal
var modal = document.getElementById("universalModal");

function bukaModalCopy() {
    // modal.style.display = "block";
}

function tutupModal() {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
// END Modal