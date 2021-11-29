var pageInfo = _spPageContextInfo;
var personal = pageInfo.userLoginName.substring(pageInfo.userLoginName.indexOf("\\") + 1);
personal = personal.replace(".", "_");
var domain = pageInfo.siteAbsoluteUrl.slice(0, pageInfo.siteAbsoluteUrl.indexOf('site') - 1);
var sites = pageInfo.siteAbsoluteUrl.slice(pageInfo.siteAbsoluteUrl.indexOf('site'));
function tesButton() {
console.log(personal);
console.log(domain);
console.log(sites);
}
// START Splash Screen
let intro = document.querySelector('.intro');
let logo = document.querySelector('.logo-header');
let logoSpan = document.querySelectorAll('.logo');

window.addEventListener('DOMContentLoaded', () => {
setTimeout(() => {
    intro.style.display = 'block';
    logoSpan.forEach((span, idx) => {
    setTimeout(() => {
        span.classList.add('active');
    }, (idx + 1) * 400)
    })

    setTimeout(() => {
    logoSpan.forEach((span, idx) => {
        setTimeout(() => {
        span.classList.remove('active');
        span.classList.add('fade');
        }, (idx + 1) * 50)

    })
    }, 2000)

    setTimeout(() => {
    intro.style.top = '-100vh';
    }, 2300)

})

})

//END Splash Screen
function uploadFile() {
var attachment = document.getElementById("attachment");
attachment.click();
}
//Start Drag n Drop
$('.drop').on('dragenter', function (event) {
event.preventDefault();
})

$('.drop').on('dragover', function (event) {
event.preventDefault();
})

var masukzone = false;
var masukselimut = false;
var selimut = document.getElementById("selimut");
var tempatDrop = document.getElementsByClassName("tempatDragDrop")[0];
var infoDragDrop = document.getElementById("infoDragDrop");
function showSelimut(status) {
    if (status == 'true'){
selimut.style.display = "block";
    }
}

function showTempatUpload() {
tempatDrop.style.display = "block";
infoDragDrop.style.display = "block";
masukselimut = true;
}

function closeTempatUpload() {
if (masukzone == false) {
    tempatDrop.style.display = "none";
    selimut.style.display = "none";
    infoDragDrop.style.display = "none";
}
if (masukzone == true) {
}
}

function closeOnDrop() {
tempatDrop.style.display = "none";
selimut.style.display = "none";
infoDragDrop.style.display = "none";
console.log('saya ke trigger')
}

function masukZona() {
masukselimut = false;
masukzone = true;
}

function keluarZona() {
if (masukselimut == false) {
    tempatDrop.style.display = "none";
    selimut.style.display = "none";
    infoDragDrop.style.display = "none";
}
masukzone = false;
}
//ENS Drag n Drop
//Start JS Search
//Klik button search langsung focus ke Inputnya (Folder dan File)
function setFocus() {
document.getElementById("FolderSearch").focus();
}
function setFocus2() {
document.getElementById("FileSearch").focus();
}
function setFocus3() {
document.getElementById("FolderSearchModalCopy").focus();
}
function setFocus4() {
document.getElementById("FileSearchModalCopy").focus();
}
//Scrool ke hasil view
function hasilSearch() {
var delayInMilliseconds = 200; //1 detik

setTimeout(function () {
    document.getElementById("hasilSearch").scrollIntoView({ behavior: "smooth" });
}, delayInMilliseconds);
}
//End JS Search

//Non aktifkan enter
$(document).ready(function () {
$(window).keydown(function (event) {
    if (event.keyCode == 13) {
    event.preventDefault();
    return false;
    }
});
});

//Non-aktifkan refresh
if (window.history.replaceState) {
window.history.replaceState(null, null, window.location.href);
}

//JS Modal Metadata
var toggle = false;
var modalMetadata = document.getElementById("tempatMetadata");
//console.log(modal)
function tesclick() {
toggle = !toggle;
if (toggle == true) {
    modalMetadata.style.display = "initial"
    tempatFilter.style.display = "none";
    cekFilter = false;
}
if (toggle == false) {
    modalMetadata.style.display = "none"
}
}

function closeMetadata() {
toggle = false;
modalMetadata.style.display = "none"
}
//JS Modal Metadata END

//Start Modal Filter
var cekFilter = false;
var modalFilter = document.getElementById("modalFilter");
var tempatFilter = document.getElementById("tempatFilter");
function bukaModalFilter() {
document.getElementById('FileSearch').style.cssText = 'width:38vh;background-color:transparent !important';
// document.getElementById('FileSearch').body.style.background = 'White !important';
modalFilter.style.display = "block";

}

function bukaDivFilter() {
cekFilter = !cekFilter;
if (cekFilter == true) {
    tempatFilter.style.display = "block";
    modalMetadata.style.display = "none";
    toggle = false;
}
if (cekFilter == false) {
    tempatFilter.style.display = "none";
}
}
var clearFilter = document.getElementById("clearFilter");
function clearFilterFun() {
clearFilter.disabled = true;
}

function enableButtonFilter() {
var anychecked = $('.checkBoxFilter').is(':checked');
if (anychecked == true) {
    clearFilter.disabled = false;
    if (document.getElementsByClassName("isiFile-isselected")[0]) {
    document.getElementsByClassName("isiFile-isselected")[0].className = "isiFile";
    filefirsttime = true;
    }
}
if (anychecked == false) {
    clearFilter.disabled = true;
}
}

//START Modal Sorting

function enableClearSort() {
var anysortchecked = $('.checkBoxSort').is(':checked');
if (anychecked == true) {
    btnclearSort.disabled = false;
}
if (anychecked == false) {
    btnclearSort.disabled = true;
}
}

var sortAscNam = true;
var sortAscTgl = true;
var sortAscJen = true;
var sortAscVer = true;
var sortAscEve = true;
var sortAscPs = true;
var sortAscSat = true;
var sortAscTip = true;

function advanceSorting(namaButton) {
console.log(namaButton);
if (namaButton == 'Nama File,name') {
    sortAscNam = !sortAscNam;
    if (sortAscNam == true) {
    document.getElementById(namaButton).innerHTML = '<i class="fas fa-sort-alpha-up"></i>';
    }
    if (sortAscNam == false) {
    document.getElementById(namaButton).innerHTML = '<i class="fas fa-sort-alpha-down"></i>';
    }
}
if (namaButton == 'Tanggal Penayangan,metadata.tanggalPelaksanaan') {
    sortAscTgl = !sortAscTgl;
    if (sortAscTgl == true) {
    document.getElementById(namaButton).innerHTML = '<i class="fas fa-sort-alpha-up"></i>';
    }
    if (sortAscTgl == false) {
    document.getElementById(namaButton).innerHTML = '<i class="fas fa-sort-alpha-down"></i>';
    }
}
if (namaButton == 'Jenis File,tipe') {
    sortAscJen = !sortAscJen;
    if (sortAscJen == true) {
    document.getElementById(namaButton).innerHTML = '<i class="fas fa-sort-alpha-up"></i>';
    }
    if (sortAscJen == false) {
    document.getElementById(namaButton).innerHTML = '<i class="fas fa-sort-alpha-down"></i>';
    }
}
if (namaButton == 'Versi,metadata.Versi') {
    sortAscVer = !sortAscVer;
    if (sortAscVer == true) {
    document.getElementById(namaButton).innerHTML = '<i class="fas fa-sort-alpha-up"></i>';
    }
    if (sortAscVer == false) {
    document.getElementById(namaButton).innerHTML = '<i class="fas fa-sort-alpha-down"></i>';
    }
}
if (namaButton == 'Event,metadata.EventId') {
    sortAscEve = !sortAscEve;
    if (sortAscEve == true) {
    document.getElementById(namaButton).innerHTML = '<i class="fas fa-sort-alpha-up"></i>';
    }
    if (sortAscEve == false) {
    document.getElementById(namaButton).innerHTML = '<i class="fas fa-sort-alpha-down"></i>';
    }
}
if (namaButton == 'PS,metadata.PSId') {
    sortAscPs = !sortAscPs;
    if (sortAscPs == true) {
    document.getElementById(namaButton).innerHTML = '<i class="fas fa-sort-alpha-up"></i>';
    }
    if (sortAscPs == false) {
    document.getElementById(namaButton).innerHTML = '<i class="fas fa-sort-alpha-down"></i>';
    }
}
if (namaButton == 'Satker,metadata.satkerPembuatId') {
    sortAscSat = !sortAscSat;
    if (sortAscSat == true) {
    document.getElementById(namaButton).innerHTML = '<i class="fas fa-sort-alpha-up"></i>';
    }
    if (sortAscSat == false) {
    document.getElementById(namaButton).innerHTML = '<i class="fas fa-sort-alpha-down"></i>';
    }
}
if (namaButton == 'Tipe Dokumen,metadata.tipeDokumenId') {
    sortAscTip = !sortAscTip;
    if (sortAscTip == true) {
    document.getElementById(namaButton).innerHTML = '<i class="fas fa-sort-alpha-up"></i>';
    }
    if (sortAscTip == false) {
    document.getElementById(namaButton).innerHTML = '<i class="fas fa-sort-alpha-down"></i>';
    }
}
}
//END Modal Sorting

//END Modal Filter

// START Sorting
var sortingAscending = true;
var keteranganSorting = document.getElementById("keteranganSorting");
var btnAtasBawah = document.getElementById("btnAtasBawah");
var select = document.getElementById("sortSelect");
var btnclearSort = document.getElementById("clearSort");

function enableClearSort() {
var anysortchecked = $('.checkBoxSort').is(':checked');
if (anysortchecked == true) {
    btnclearSort.disabled = false;
}
if (anysortchecked == false) {
    btnclearSort.disabled = true;
}
}
function ubahSort() {
sortingAscending = !sortingAscending;
btnclearSort.disabled = false;
if (sortingAscending == true) {
    keteranganSorting.innerHTML = "Ascending";
    btnAtasBawah.innerHTML = '<i class="fas fa-sort-alpha-up"></i>';
}
if (sortingAscending == false) {
    keteranganSorting.innerHTML = "Descending";
    btnAtasBawah.innerHTML = '<i class="fas fa-sort-alpha-down"></i>';
}
}

function clearSortHapus() {
sortingAscending = true;
keteranganSorting.innerHTML = "Ascending";
btnAtasBawah.innerHTML = '<i class="fas fa-sort-alpha-up"></i>';
select.value = "default"
btnclearSort.disabled = true;
}

function disableBtnClearSort() {
btnclearSort.disabled = false;
}
// END Sorting

var modalManFolder = document.getElementById("modalManFolder");

// Get the <span> element that closes the modal
var spanFolder = document.getElementById("ModalFolderClose");

var TitleManFolder = document.getElementById("TitleManFolder");

function bukaModalFolder(titleModal, create) {
if (create == true) {
    TitleManFolder.innerHTML = titleModal;
    modalManFolder.style.display = "block";
}
if (create == false) {
    var path = document.getElementById("path").innerHTML;
    console.log(path);
    if (path == null) {
    }
    if (path !== null) {
    setTimeout(function () {
        TitleManFolder.innerHTML = titleModal;
        modalManFolder.style.display = "block";
    }, 300);

    }
}

}

spanFolder.onclick = function () {
modalManFolder.style.display = "none";
}

function closeModalFolder(folderCommand) {
var path = document.getElementById("path").innerHTML;
if (folderCommand == null) {
    modalManFolder.style.display = "none";

}
if (folderCommand == 'delete') {
    modalManFolder.style.display = "none";
    var splice = path.slice(0, path.lastIndexOf('/'));
    setTimeout(function () {
    document.getElementById(splice).click();
    }, 500);
    setTimeout(function () {
    document.getElementById(splice).click();
    }, 500);
}
if (folderCommand == 'create') {
    modalManFolder.style.display = "none";
    document.getElementById(path).click();
    setTimeout(function () {
    document.getElementById(path).click();
    }, 500);
}
if (folderCommand == 'rename') {
    modalManFolder.style.display = "none";
    var splice = path.slice(0, path.lastIndexOf('/'));
    console.log('path full :' + path);
    console.log('hasil potong :' + splice);
    var renameFolder = document.getElementById('inputRenameFolder').value;
    var pathBaru = splice + '/' + renameFolder;
    console.log('path baru : ' + pathBaru);
    setTimeout(function () {
    document.getElementById(splice).click();
    }, 1000);
    setTimeout(function () {
    document.getElementById(splice).click();
    }, 1500);
    for (let x = 0; x < 6; x++) {
    setTimeout(function () {
        if (document.getElementById(pathBaru)) {
        document.getElementById(pathBaru).click();
        setTimeout(function () {
            document.getElementById(pathBaru).click();
        }, 200);
        }
    }, 400 * x);
    }
}
if (folderCommand == 'renameFile') {
    modalManFolder.style.display = "none";
    setTimeout(function () {
    document.getElementById(path).click();
    }, 500);
}
}

//JS Modal Download
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementsByClassName("modalBtn")[0];

// Get the <span> element that closes the modal

var ModalTitleDU = document.getElementsByClassName("ModalTitle")[0];
// When the user clicks on the button, open the modal
btn.onclick = function () {
modal.style.display = "block";
ModalTitleDU.innerHTML = 'List Download <span onclick="tutupModalDU()" class="closeModal">&times;</span>';
}

function bukaModalUpload() {
modal.style.display = "block";
ModalTitleDU.innerHTML = 'List Upload <span onclick="tutupModalDU()" class="closeModal">&times;</span>';
}

function tutupModalDU() {
modal.style.display = "none";
tempatDrop.style.display = "none";
selimut.style.display = "none";
infoDragDrop.style.display = "none";
}

//JS Modal Download END

//JS Modal Copy

var modalCopy = document.getElementById("modalCopy");

function tutupModalCopy(){
    modalCopy.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
if (event.target == modalCopy) {
    modalCopy.style.display = "none";
    filefirsttime = true;
}
if (event.target == modalManFolder) {
    modalManFolder.style.display = "none";
}
if (event.target == modal) {
    modal.style.display = "none";
    tempatDrop.style.display = "none";
    selimut.style.display = "none";
    infoDragDrop.style.display = "none";
}
if (event.target == modalFilter) {
    modalFilter.style.display = "none";
    document.getElementById('FileSearch').style.cssText = 'width:0;background-color:#045498';
}
}
//JS Modal Copy END

// Focus State menu dan Folder
var firsttime = true;
var folderfirsttime = true;
var filefirsttime = true;

function bukaModalCopy(ext) {
    console.log(ext)
    if(document.getElementsByClassName("button-folder-isselected")[0]){
        document.getElementsByClassName("button-folder-isselected")[0].className = "button-folder";
    }
    if(document.getElementsByClassName("isiFile-isselected")[0]){
        document.getElementsByClassName("isiFile-isselected")[0].className = "isiFile";
    }
folderfirsttime = true;
// filefirsttime = true;
modalCopy.style.display = "block";
}

//Focus state menu
async function menuFocus(idmenu, hasilSearching) {
filefirsttime = true;
folderfirsttime = true;
if (firsttime == false) {
    document.getElementsByClassName("button-menu-isselected")[0].className = "button-menu";
    document.getElementById(idmenu).className = "button-menu-isselected";

} else {
    document.getElementById(idmenu).className = "button-menu-isselected";
    firsttime = !firsttime;
}
var idMenuFolder = await clickFolderMenu(domain+idmenu);
if(idMenuFolder == true){
    
    document.getElementById(domain+idmenu).click();
}
if(idMenuFolder == false){
    alert('Folder tidak dapat di load');
}
}

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

//Focus state folder
function folderFocus(idfolder, searching) {
filefirsttime = true;
var idpath = "Path_" + idfolder;
//console.log(idpath);
if (searching == true) {
    if (folderfirsttime == false) {
    document.getElementsByClassName("button-folder-isselected")[0].className = "button-folder";
    document.getElementsByClassName("pathSearching-isselected")[0].className = "pathSearching";
    document.getElementById(idfolder).className = "button-folder-isselected";
    document.getElementById(idpath).className = "pathSearching-isselected";
    } else {
    document.getElementById(idfolder).className = "button-folder-isselected";
    document.getElementById(idpath).className = "pathSearching-isselected";
    folderfirsttime = !folderfirsttime;
    }
}
if (searching == false) {
    if (folderfirsttime == false) {
    document.getElementsByClassName("button-folder-isselected")[0].className = "button-folder";
    document.getElementById(idfolder).className = "button-folder-isselected";
    }
    if (folderfirsttime == true) {
    document.getElementById(idfolder).className = "button-folder-isselected";
    folderfirsttime = !folderfirsttime;
    }
}
}

function fileFocus(idFile) {
    if(document.getElementsByClassName("isiFile-isselected")[0]){
        document.getElementsByClassName("isiFile-isselected")[0].className = "isiFile";
        document.getElementById(idFile).className = "isiFile-isselected";
    }
    if(!document.getElementsByClassName("isiFile-isselected")[0]){
        document.getElementById(idFile).className = "isiFile-isselected";
    }
// if (filefirsttime == false) {
//     document.getElementsByClassName("isiFile-isselected")[0].className = "isiFile";
//     document.getElementById(idFile).className = "isiFile-isselected";
// }
// if (filefirsttime == true) {
//     document.getElementById(idFile).className = "isiFile-isselected";
//     filefirsttime = !filefirsttime;
// }

}

function paginationFocus(paginationID) {
if (document.getElementsByClassName("btn btn-sm btn-outline-secondary-isselected")[0]) {
    document.getElementsByClassName("btn btn-sm btn-outline-secondary-isselected")[0].className = 'btn btn-sm btn-outline-secondary';
}
console.log(paginationID);
document.getElementById(paginationID).className = "btn btn-sm btn-outline-secondary-isselected";
}

function paginationBertambah() {
newPagination = "pagination2";
if (document.getElementsByClassName('btn btn-sm btn-outline-secondary-isselected')[0]) {
    var current = document.getElementsByClassName('btn btn-sm btn-outline-secondary-isselected')[0];
    if (current.id !== 'pagination6') {
    newPagination = 'pagination' + (parseInt(current.id.slice(current.id.lastIndexOf('n') + 1)) + 1);
    current.className = 'btn btn-sm btn-outline-secondary';
    document.getElementById(newPagination).className = "btn btn-sm btn-outline-secondary-isselected";
    }
} else {
    document.getElementById(newPagination).className = "btn btn-sm btn-outline-secondary-isselected";
}

}

function paginationBerkurang() {
if (document.getElementsByClassName('btn btn-sm btn-outline-secondary-isselected')[0]) {
    var current = document.getElementsByClassName('btn btn-sm btn-outline-secondary-isselected')[0];
    if (current.id !== 'pagination1') {
    var newPagination = 'pagination' + (parseInt(current.id.slice(current.id.lastIndexOf('n') + 1)) - 1);
    current.className = 'btn btn-sm btn-outline-secondary';
    document.getElementById(newPagination).className = "btn btn-sm btn-outline-secondary-isselected";
    }
}
}


//Reset folder focus kalau menu di klik
function ResetFolder() {
folderfirsttime = true;
}
//END FOCUS STATE
function bukaFolder() {
var folder_buka = document.getElementById('https://dokumen.bi.go.id/sites/mysite/personal/kevin_eza/Personal Lib/Personal/Budak 1');
folder_buka.click(); folder_buka.click();
}

async function goToFolder(path) {
path = path.replace("%20", " ");
path = path.replace("card", "");
var targetPath = path.slice(path.indexOf('sites'));
let arrayPath = targetPath.split('/')
let workingPath = '';
let pathClick = [];

// Dapatkan list ID button
for (let i = 0; i < arrayPath.length; i++) {
    workingPath = workingPath + '/' + arrayPath[i]
    if (i == 3) {
    pathClick.push(workingPath);
    }
    if (i > 2) {
    pathClick.push(domain + workingPath)
    }
};

// Scroll ke Box Wrapper
setTimeout(function () {
    document.getElementsByClassName("box-floating")[0].scrollIntoView({ behavior: "smooth" });
}, 200);

// Simulasi klik sampai ke File
for (let x = 0; x < pathClick.length; x++) {
    var idExist = await checkIDDiv(pathClick[x]);
    console.log('induk' + idExist)
    if (idExist == true) {
    if (x == 0) {
        document.getElementById(pathClick[x]).click();
    }
    if (x > 1) {
        document.getElementById(pathClick[x]).click();
    }
    if (x == pathClick.length - 1) {
        document.getElementById(pathClick[x]).scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
    }
    if (idExist == false) {
    alert('Folder tidak dapat di load');
    break;
    }
}
}

async function checkIDDiv(paramPath) {
console.log('anak');
return new Promise((resolve) => {
    var idExist = false;

    for (let limit = 0; limit < 6; limit++) {
    setTimeout(function () {
        if (document.getElementById(paramPath)) {
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

        //START Preview File
        async function previewFile(preurl,dokumen){
        console.log('url : '+preurl);
        console.log('dok : '+dokumen);
        preurl = preurl.replace("preview", "");
        var weburl = await getWebUrl(preurl);
        console.log('weburl: '+weburl);
        if(dokumen == 'office'){
            var openFilePath = weburl+'_layouts/15/WopiFrame.aspx?sourcedoc='+preurl+'&action=edit';
            window.open(openFilePath);
        }
        if(dokumen == 'other'){
            console.log(preurl);
            window.open(preurl);
        }
    }

    async function getWebUrl(paramurl){
        console.log('paramurl: '+paramurl);
        return new Promise((resolve) => {
            if(paramurl.includes(personal)){
                var personalPath = paramurl.slice(0, paramurl.indexOf(personal));   
                personalPath = personalPath+personal+'/';
                console.log( 'personal path : '+personalPath);
                resolve(personalPath);
            }
            if(!paramurl.includes(personal)){
                var arrPath = paramurl.split('/');
                var lengthSite = 0;
                for(let x = 0;x<arrPath.length;x++){
                    if(x>0){
                        if(arrPath[x-1].includes('sites')){
                        console.log(arrPath[x]);
                        lengthSite = x+1;
                        break
                        }
                    }}
                var workSpacePath ='';
                for(let i = 0; i<lengthSite;i++){
                    workSpacePath = workSpacePath+arrPath[i]+'/';
                }
                resolve(workSpacePath);
            }
        })

    }
    //END Preview File