// demo data
var treeData = {
    name: "RDG bulanan",
    children: [
        { name: "Jadwal RDG bulanan.pdf" },
        {
            name: "2021",
            children: [
                {
                    name: "Januari",
                    children: [{ name: "tayangan januari.pptx" }, { name: "ringsek Januari.pdf" }],
                },
                { name: "Rencana 2021.xlx" },
                { name: "Anggaran RDG 2021.xlx" },
                {
                    name: "Februari",
                    children: [{ name: "tayangan Februari.pptx" }, { name: "ringsek Februari.pdf" }],
                },
            ],
        },
    ],
};

// define the tree-item component
Vue.component("tree-item", {
    template: "#item-template",
    props: {
        item: Object,
    },
    data: function () {
        return {
            isOpen: false,
        };
    },
    computed: {
        isFolder: function () {
            return true;
        },
    },
    methods: {
        toggle: function () {
            if (this.isFolder) {
                this.isOpen = !this.isOpen;

                this.$emit("clicked", this.item)
            }
        },
        makeFolder: function () {
            if (!this.isFolder) {
                this.$emit("make-folder", this.item);
                this.isOpen = true;
            }
        },
    },
});


NProgress.configure({ trickle: false });
Vue.filter('kb', val => {
    return Math.floor(val / 1024);
});
Vue.filter('mb', val => {
    return (val / 1048576).toFixed(2);
});
// boot up the demo
var demo = new Vue({
    el: "#body",
    components: {
        draggable: window['vuedraggable']
    },
    data: {
        //ListWorkspace
        ListWorkspaceAvailable: [['https://dokumen.bi.go.id/sites/documentCenter_gbioffc', 'GBI Office'], ['https://dokumen.bi.go.id/sites/documentCenter_DGdoc', 'Shared Documents'], ['https://dokumen.bi.go.id/sites/documentCenter_dgsoffc', 'DGS Office'], ['https://dokumen.bi.go.id/sites/documentCenter_adg3offc', 'ADG Bidang 3 Office'], ['https://dokumen.bi.go.id/sites/documentCenter_adg4offc', 'ADG Bidang 4 Office'], ['https://dokumen.bi.go.id/sites/documentCenter_adg5offc', 'ADG Bidang 5 Office'], ['https://dokumen.bi.go.id/sites/documentCenter_adg6offc', 'ADG Bidang 6 Office']],
        //treeview
        treeData: treeData,
        isclicked: false,
        isFolderClicked: false,
        length: 5,
        //sort
        sortSelected: 'default',
        isAscending: true,
        sortList: [['Nama File', 'name'], ['Tanggal Penayangan', 'metadata.tanggalPelaksanaan'], ['Extension', 'tipe'], ['Versi', 'metadata.Versi'], ['Event', 'metadata.EventId'], ['PS', 'metadata.PSId'], ['Satker', 'metadata.satkerPembuatId'], ['Tipe Dokumen', 'metadata.tipeDokumenId']],
        advanceSortSelected: [],
        advanceSortSelectedtemp: [],
        fixedAdvanceSort: [],
        tempSort: [],
        isSortLoading: [],
        //filter
        filterSatkerSelected: [],
        filterPsSelected: [],
        filterEventSelected: [],
        filterPresenterSelected: [],
        filterTipeDokumenSelected: [],
        filterVersiSelected: [],
        filterKeywordSelected: [],
        filterExtensionSelected: [],
        filterSatker: [],
        filterPs: [],
        filterEvent: [],
        filterPresenter: [],
        filterTipeDokumen: [],
        filterVersi: [],
        filterKeyword: [],
        filterExtension: [],
        filteredFile: [],
        detailFilter: '',
        blacklistKeyword: ['Januari', 'Februari', 'maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
        //search
        searchUnknown: '',
        rowHasilSearch: 0,
        rowHasilSearchRelevan: 0,
        findAllDoclib: false,
        searchField: '',
        searchFolder: '',
        searchModalFolder: '',
        searchFile: '',
        searchModalFile: '',
        resultFolderSearch: [],
        resultModalFolderSearch: [],
        resultFileSearch: [],
        resultModalFileSearch: [],
        resultbyTitle: [],
        resultbyFolder: [],
        resultbyDescription: [],
        resultbyRelevance: [],
        responseSearch: [],
        resultAdvanceSearch: [],
        yangDimunculin: [],
        onAdvanceSearch: false,
        onFolderSearch: false,
        onModalFolderSearch: false,
        onFileSearch: false,
        onModalFileSearch: false,
        parentActive: '',
        parentActiveUri: '',
        //loader
        isMetadataLoading: false,
        isParentLoading: true,
        isFolderLoading: false,
        isModalFolderLoading: false,
        isFileLoading: false,
        isSearchLoading: false,
        isPresenterLoading: false,
        isModifikatorLoading: false,
        isCreatorLoading: false,
        isPersonalLoading: true,
        //conditional
        isRequestModalClicked: false,
        isTypeSortListWorkspace: false,
        isAdminUser: false,
        isNavigating: true,
        isIframe: false,
        isGlobalSearch: false,
        isDragedFile: true,
        isFileEmpty: true,
        isModalFileEmpty: true,
        isSelectedFile: false,
        isParentClicked: false,
        isclickedPersonal: false,
        searchFileDoclib: false,
        searchFileDoclibFinish: false,
        isModalFileLoading: false,
        isPersonal: false,
        production: true,
        isCopyModalChoosed: false,
        isCopyModalClicked: true,
        isTest: false,
        isDownload: false,
        isDownloadModalClicked: false,
        isUpload: false,
        isFileRename: false,
        isFileDelete: false,
        isFiltered: false,
        //rename delete file
        fileSelected: {},
        txtRequest: '',
        //apiTemp
        responseFolder: [],
        responseFile: [],
        listDownload: [],
        listDownloadTemp: [],
        listTemp: [],
        listOriginalParent: [],
        //log
        folderLast: null,
        fileLast: null,
        //path
        linkFolderPersonal: null,
        linkFolder: null,
        //viewedArray
        listAllWorkspace: [],
        listPersonal: [],
        listParent: [],
        listOriginalParent: [],
        listMetadata: [],
        listFolder: {},
        listPersonalTreeView: {},
        listFile: [],
        listTemp: [],
        dataDict: [],
        folderData: [],
        childData: [],
        listSearchFileDoclib: [],
        filesShow: [],
        //modalLocation Copy
        listFileModal: [],
        //pagination
        posts: [],
        baseUrl: "https://jsonplaceholder.typicode.com/",
        page: 1,
        perPage: 9,
        pages: [],
        //draggableWorkspace
        savedList: {},
        workspaceList: [],
        personalOptions: {
            group: {
                name: 'wadah',
                put: ["folder", "file"],
                pull: false,
            }
        },
        childPersonalOptions: {
            group: {
                name: 'personal',
                put: false,
                pull: false
            }
        },
        fileOptions: {
            group: {
                name: 'file',
                put: () => false,
                pull: "clone"
            }
        },
        //metadata
        listMetadataSistem: [],
        listMetadataRefecth: [],
        listMetadataRename: [],
        listMetadataList: [],
        listMetadataTampil: [],
        namaTopik: '',
        satkerPembuat: '',
        pS: '',
        event: '',
        presenter: '',
        tanggalPelaksanaan: '',
        keyword: '',
        versi: '',
        jenisDokumen: '',
        modified: '',
        modifikator: '',
        created: '',
        creator: '',
        //list All
        listEvent: [],
        listPs: [],
        listSatker: [],
        listDokumen: [],
        //animasi
        tampil: false,
        //copyFile
        domain: "https://dokumen.bi.go.id",
        sourceUrl: "https://dokumen.bi.go.id/sites/documentCenter_DGdoc",
        personalUrl: "https://dokumen.bi.go.id/sites/mysite/personal/",
        //modalforCopy
        coppiedFile: [],
        coppiedFileShow: [],
        //modal create folder
        createFolderInput: '',
        isCreateFolder: false,
        isRenameFolder: false,
        isDeleteFolder: false,
        folderDeleted: '',
        choosedFolder: {},
        choosedFolderMetadata: {},
        //progress bar
        progressMultipleCopy: 0.0,
        //treeviewCopyFile
        treeviewCopy: { name: 'Personal Workspace', children: [], leve: 0, filesUri: 'parentNihBoss', folderId: 'IndukPersonalWorkspace', folderUri: 'parentNihBoss', folderLocation: 'parentNihBoss', metadata: 'parentNihBoss', path: 'parentNihBoss' },
        //uploadFile
        files: [],
        //forget
        akunUser: '',
        x: null,
        backdoor: 0,
        selectedParent: {},
        selectedIdParent: '',
        //filterAdvanceSearch
        listCheckbox: [['Folder', 'isFolder'], ['File', 'isFile'], ['Content', 'isContent'], ['Metadata', 'isMetadata']],
        checkboxAdvanceSearch: ['isFile', 'isFolder', 'isMetadata']
    },
    watch: {
        advanceSortSelected() {
            this.isSortLoading = true
            if (this.advanceSortSelected.length > 0) {
                this.advanceSortSelectedTemp = this.advanceSortSelected
                this.injectSort()
            }
            this.onFileSearch = true
            this.isSortLoading = false

        },
        checkboxAdvanceSearch() { this.advanceSearch() },
        sortSelected() {
            this.advanceSortSelectedtemp = []
            this.fixedAdvanceSort = []
            this.tempSort = []
            this.advanceSortSelected = []
            this.onFileSearch = true
            this.backdoor++
        },
        yangDimunculin() {
            this.setPages();
        },
        filterSatkerSelected() { this.filterFile() },
        filterPsSelected() { this.filterFile() },
        filterEventSelected() { this.filterFile() },
        filterPresenterSelected() { this.filterFile() },
        filterTipeDokumenSelected() { this.filterFile() },
        filterVersiSelected() { this.filterFile() },
        filterKeywordSelected() { this.filterFile() },
        filterExtensionSelected() { this.filterFile() },
    },
    created() {
        window.addEventListener('keypress', this.searchFileTyped);
        NProgress.start()
    },
    destroyed() {
        window.removeEventListener('keypress', this.searchFileTyped);
    },
    mounted() {
        this.logLogin()
        if ((_spPageContextInfo.userEmail == 'yulianto_an.i@bi.go.id') || (_spPageContextInfo.userEmail == 'kevin_eza@bi.go.id')) {
            this.isAdminUser = true
        }
        this.akunUser = _spPageContextInfo.userDisplayName
        let temp = _spPageContextInfo.userLoginName.split("\\")
        this.showAll()
        var server = _spPageContextInfo.webAbsoluteUrl;
        const myArr = server.split("/", 3);
        for (i in this.ListWorkspaceAvailable) {
            this.getListParent(this.ListWorkspaceAvailable[i][0], i)
        }
        this.listMetadataTampil = [
            'Nama Topik',
            'Satker Pembuat',
            'Program Strategis',
            'Event',
            'Presenter',
            'Tanggal Pelaksanaan',
            'Keyword',
            'Versi',
            'Jenis Dokumen',
            'Modified',
            'Modified By',
            'Created',
            'Creator'
        ]
        this.listMetadataRefecth = [
            'AuthorId',
            'EditorId',
            'PresenterId'
        ]
        this.listMetadataSistem = [
            'Activities',
            'AttachmentFiles',
            'CheckoutUserId',
            'ComplianceAssetId',
            'ContentType',
            'ContentTypeId',
            'FieldValuesAsHtml',
            'FieldValuesAsText',
            'FieldValuesForEdit',
            'File',
            'FileSystemObjectType',
            'FirstUniqueAncestorSecurableObject',
            'Folder',
            'GUID',
            'GetDlpPolicyTip',
            'ID',
            'Id',
            'Title',
            'LikedByInformation',
            'PresenterStringId',
            'OData__CopySource',
            'OData__UIVersionString',
            'ParentList',
            'Properties',
            'RoleAssignments',
            'ServerRedirectedEmbedUri',
            'ServerRedirectedEmbedUrl',
            'SharedWithDetails',
            'SharedWithUsersId',
            'Versions',
            '__metadata'
        ]
        this.listMetadataRename = [['namaTopik', 'Nama Topik'], ['tanggalPelaksanaan', 'Tanggal Pelaksanaan']]
        this.listMetadataList = ['EventId', 'PSId', 'satkerPembuatId', 'tipeDokumenId']

        NProgress.done(true);
    },
    computed: {
        lengthReq() {
            return this.txtRequest.length
        },
        uploadDisabled() {
            return this.files.length === 0;
        },
        selectedItems() {
            this.backdoor
            console.log('selectedItems')
            var sortBy = ''
            var urutan = ''
            switch (this.sortSelected) {
                case 'namaFile':
                    sortBy = 'name'
                    break;
                case "tglPenayangan":
                    sortBy = "metadata.tanggalPelaksanaan"
                    break;
                case "jenisFile":
                    sortBy = 'tipe'
                    break;
                case "versi":
                    sortBy = 'metadata.Versi'
                    break;
                case "event":
                    sortBy = 'metadata.EventId'
                    break;
                case "ps":
                    sortBy = 'metadata.PSId'
                    break;
                case "satker":
                    sortBy = 'metadata.satkerPembuatId'
                    break;
                case "tipeDokumen":
                    sortBy = 'metadata.tipeDokumenId'
                    break;
                case "":
                    sortBy = ''
                    break;
                case "default":
                    sortBy = ''
                    break;
            }
            if (this.isAscending) {
                urutan = 'asc'
            } else {
                urutan = 'desc'
            }
            if (this.fixedAdvanceSort.length > 0) {
                var nama = []
                var urut = []
                console.log(this.fixedAdvanceSort)
                for (i in this.fixedAdvanceSort) {
                    nama.push(this.fixedAdvanceSort[i][0])
                    urut.push(this.fixedAdvanceSort[i][1])
                }
            }
            if (!this.findAllDoclib) {
                if (this.isFiltered) {
                    console.log('filter')
                    this.resultFileSearch = this.filteredFile.filter(item => item.name.toLowerCase().includes(this.searchFile.toLowerCase()))
                    if (sortBy == "" && !Array.isArray(nama)) {
                        return this.resultFileSearch

                    } else {
                        if (nama != undefined) {
                            if (Array.isArray(nama)) {
                                return _.orderBy(this.resultFileSearch, nama, urut);
                            }
                        } else {
                            return _.orderBy(this.resultFileSearch, sortBy, urutan);

                        }
                    }
                } else {
                    console.log('file')

                    this.resultFileSearch = this.listFile.filter(item => item.name.toLowerCase().includes(this.searchFile.toLowerCase()))
                    if (sortBy == "" && !Array.isArray(nama)) {
                        return this.resultFileSearch
                    } else {
                        if (nama != undefined) {
                            if (Array.isArray(nama)) {
                                console.log(urut)
                                return _.orderBy(this.resultFileSearch, nama, urut);
                            }
                        }
                        else {
                            return _.orderBy(this.resultFileSearch, sortBy, urutan);

                        }
                    }
                }
            }
            else {
                if (this.isFiltered) {
                    console.log('filter')
                    this.resultFileSearch = this.filteredFile
                    if (sortBy == "" && !Array.isArray(nama)) {
                        console.log(sortBy)
                        console.log('kosong')
                        return this.resultFileSearch
                        console.log(this.filteredFile)
                    } else {
                        if (nama != undefined) {
                            if (Array.isArray(nama)) {
                                console.log('kena')
                                return _.orderBy(this.resultFileSearch, nama, urut);
                                console.log(this.filteredFile)
                            }
                        } else {
                            console.log('ininih')
                            return _.orderBy(this.resultFileSearch, sortBy, urutan);
                            console.log(this.filteredFile)

                        }
                    }
                } else {
                    console.log('doclibFile')
                    this.resultFileSearch = this.listSearchFileDoclib
                    if (sortBy == "" && !Array.isArray(nama)) {
                        return this.resultFileSearch
                        console.log('dd')
                        console.log(this.filteredFile)
                    } else {
                        if (nama != undefined) {
                            if (Array.isArray(nama)) {
                                return _.orderBy(this.listSearchFileDoclib, nama, urut);
                                console.log('dd')
                                console.log(this.filteredFile)
                            }
                        } else {
                            return _.orderBy(this.listSearchFileDoclib, sortBy, urutan);
                            console.log('dd')
                            console.log(this.filteredFile)

                        }
                    }
                }

            }
        },
        selectedModalItems() {
            return this.resultModalFileSearch = this.listFileModal.filter(item => item.name.toLowerCase().includes(this.searchModalFile.toLowerCase()));
        },
        displayedPosts() {
            return this.paginate(this.yangDimunculin);
        },
    },
    methods: {
        logLogin(){
            var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+'_'+time;

 $.ajax({
                url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/GetFileByServerRelativeUrl('/sites/Workspace_Dev/WebPart/asset/config/log/"+date+_spPageContextInfo.userId+_spPageContextInfo.userEmail+"LogAkses.json')/$value",
                type: "GET",
                context: this,
                headers: { "accept": "application/json;odata=verbose" },
                success: function onSuccess(data) {
                  const responseJson = (JSON.parse(data))
                  console.log('ada')
                  let arrTemp = responseJson.login
                  responseJson.login.push({userId:_spPageContextInfo.userId,userEmail:_spPageContextInfo.userEmail,date:dateTime})
                  const obj = {login:responseJson.login}
                  this.createJsonList(obj, 'logLogin')
                    // this.WorkspaceListExist(responseJson)
                },
                error:function (xhr, ajaxOptions, thrownError){
                    // this.WorkspaceListNew()
                    console.log('kosong')
                    const loginData = [{userId:_spPageContextInfo.userId,userEmail:_spPageContextInfo.userEmail,date:dateTime}]
                    const obj = { login: loginData };
                    this.createJsonList(obj, 'logLogin')

                    },
              });
        },
        sortWorkspace() {
            if (this.isTypeSortListWorkspace == false) {
                this.listParent = _.orderBy(this.listParent, 'name', 'asc')
                this.isTypeSortListWorkspace = !this.isTypeSortListWorkspace
                this.updateWorkspaceList()
            } else {
                this.listParent = _.orderBy(this.listParent, 'name', 'desc')
                this.isTypeSortListWorkspace = !this.isTypeSortListWorkspace
                this.updateWorkspaceList()
            }
        },
        getWorkspace() {
            $.ajax({
                // [site]/_api/search/query?querytext='timesheets'
                // url:"https://dokumen.bi.go.id/sites/Workspace_Dev/_api/Web/GetFolderByServerRelativeUrl('/sites/Workspace_Dev/DocLib/')?$expand=Folders,Files",
                //url:"https://dokumen.bi.go.id/sites/mysite/personal/yulianto_an_i/_api/Web/GetFolderByServerRelativeUrl('/sites/mysite/personal/yulianto_an_i/Documents/')?$expand=Folders/ListItemAllFields,Files/ListItemAllFields,Files/Author,ListItemAllFields/File,Activities,Files/ListItemAllFields/Properties",
                url: "https://dokumen.bi.go.id/sites/documentCenter_DGdoc/_api/Web/GetFolderByServerRelativeUrl('/sites/documentCenter_DGdoc/Shared%20Documents/')?$expand=Folders,Files,Folders/ListItemAllFields",
                // https://dokumen.bi.go.id/sites/documentCenter_DGdoc
                type: "GET",
                context: this,
                headers: { "accept": "application/json;odata=verbose" },
                success: function onSuccess(data) {

                    // this.listParent = data.d.Folders.results
                    this.listOriginalParent = data.d.Folders.results
                    this.cekListWorkspace('all')
                    // this.sorting(this.listParent)

                }
            });
            $.ajax({
                url: "https://dokumen.bi.go.id/sites/documentCenter_DGdoc/_api/web/lists/GetByTitle('List Event')/items",
                type: "GET",
                context: this,
                headers: { "accept": "application/json;odata=verbose" },
                success: function onSuccess(data) {
                    console.log('event')
                    console.log(data.d.results)
                    this.listEvent = data.d.results
                }
            });

            $.ajax({
                url: "https://dokumen.bi.go.id/sites/documentCenter_DGdoc/_api/web/lists/GetByTitle('List PS')/items",
                type: "GET",
                context: this,
                headers: { "accept": "application/json;odata=verbose" },
                success: function onSuccess(data) {
                    this.listPs = data.d.results
                }
            });

            $.ajax({
                url: "https://dokumen.bi.go.id/sites/documentCenter_DGdoc/_api/web/lists/GetByTitle('List satkerPembuat')/items",
                type: "GET",
                context: this,
                headers: { "accept": "application/json;odata=verbose" },
                success: function onSuccess(data) {
                    this.listSatker = data.d.results
                }
            });

            $.ajax({
                url: "https://dokumen.bi.go.id/sites/documentCenter_DGdoc/_api/web/lists/GetByTitle('List tipeDokumen')/items",
                type: "GET",
                context: this,
                headers: { "accept": "application/json;odata=verbose" },
                success: function onSuccess(data) {
                    this.listDokumen = data.d.results
                }
            });
        },
        cekListWorkspace(tipe) {
            if (tipe == 'personal') {
                $.ajax({
                    url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/GetFileByServerRelativeUrl('/sites/Workspace_Dev/WebPart/asset/config/" + _spPageContextInfo.userId + _spPageContextInfo.userEmail + ".json')/$value",
                    type: "GET",
                    context: this,
                    headers: { "accept": "application/json;odata=verbose" },
                    success: function onSuccess(data) {
                        const responseJson = (JSON.parse(data))
                        this.WorkspaceListExist(responseJson)
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        this.WorkspaceListNew()
                    },
                });
            }
            else if (tipe == 'all') {
                $.ajax({
                    url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/GetFileByServerRelativeUrl('/sites/Workspace_Dev/WebPart/asset/config/listAllWorkspace.json')/$value",
                    type: "GET",
                    context: this,
                    headers: { "accept": "application/json;odata=verbose" },
                    success: function onSuccess(data) {
                        const responseJson = (JSON.parse(data))
                        console.log('resp')
                        console.log(responseJson)
                        this.listAllWorkspace = responseJson
                        this.cekListWorkspace('personal')
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        console.log('hubungi admin untuk generate list Workspace')
                    },
                });
            }
        },
        personalUndragged() {
            console.log(this.listDownload)
            this.isDragedFile = true
        },
        personalDragged() {
            console.log('personaldragged')
            this.isDragedFile = false
        },
        workspaceUndragged(id) {
            console.log(this.listDownload)
            this.isDragedFile = true
        },
        workspaceDragged() {
            console.log('workspacedragged')
            this.isDragedFile = false
        },
        activeSearch(tipe) {
            this.updateListAllWorkspace()
        },
        updateListAllWorkspace() {
            console.log(this.listOriginalParent)
            let arrTemp = []
            for (i in this.listOriginalParent) {
                if (this.listOriginalParent[i].Name != 'Forms') {
                    arrTemp.push([this.listOriginalParent[i].ListItemAllFields.ID, this.listOriginalParent[i].Name, this.listOriginalParent[i].ServerRelativeUrl])
                }
            }
            const obj = { listWorkspace: arrTemp };
            this.createJsonList(obj, 'listWorkspaceAll')
        },
        WorkspaceListNew() {
            console.log('bikin')
            let arrTemp = []
            console.log(this.listAllWorkspace.listWorkspace)
            for (i in this.listAllWorkspace.listWorkspace) {
                this.workspaceList.push(this.listAllWorkspace.listWorkspace[i][0])
                found = this.listOriginalParent.some(el => el.ListItemAllFields.ID === this.listAllWorkspace.listWorkspace[i][0]);
                if (found) {
                    arrTemp.push({ name: this.listAllWorkspace.listWorkspace[i][1], ServerRelativeUrl: this.listAllWorkspace.listWorkspace[i][2], ID: this.listAllWorkspace.listWorkspace[i][0] })
                } else {
                    arrTemp.push({ name: this.listAllWorkspace.listWorkspace[i][1], ServerRelativeUrl: 'nonAccess_' + this.listAllWorkspace.listWorkspace[i][2], ID: this.listAllWorkspace.listWorkspace[i][0] })
                }
            }
            const obj = { workspace: this.workspaceList, GBI: this.workspaceList };
            this.createJsonList(obj, 'workspace')
            this.listParent = arrTemp
            this.isParentLoading = false
        },
        WorkspaceListExist(data) {
            let arrNotInc = []
            const arrTampil = []
            const tempList = this.listAllWorkspace.listWorkspace
            console.log('listAll')
            this.savedList = data
            let status = false
            let found = false
            console.log(this.savedList)
            for (i in tempList) {
                status = false
                for (j in data.workspace) {
                    if (data.workspace[j] == tempList[i][0]) {
                        found = this.listOriginalParent.some(el => el.ListItemAllFields.ID === data.workspace[j]);
                        if (found) {
                            arrTampil[j] = { name: tempList[i][1], ServerRelativeUrl: tempList[i][2], ID: tempList[i][0] }
                        }
                        else {
                            arrTampil[j] = { name: tempList[i][1], ServerRelativeUrl: 'nonAccess_' + tempList[i][2], ID: tempList[i][0] }
                        }
                        status = true
                        break
                    }
                }
                if (status == false) {
                    arrNotInc.push({ name: tempList[i][1], ServerRelativeUrl: 'nonAccess_' + tempList[i][2], ID: tempList[i][0] })
                }
            }
            for (k in arrNotInc) {
                arrTampil.push(arrNotInc[k])
            }
            console.log('final')
            console.log(arrTampil)
            this.listParent = arrTampil
            this.isParentLoading = false
        },
        createJsonList(data, location) {
            var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
var dateTime = date+'_'+time;
            const content = JSON.stringify(data)
            if (location == 'workspace') {
                $.ajax({
                    url: _spPageContextInfo.webAbsoluteUrl + "/_api/contextinfo",
                    type: "POST",
                    headers: {
                        "Accept": "application/json;odata=verbose"
                    },
                    success: function (data) {
                        var digest = data.d.GetContextWebInformation.FormDigestValue;
                        var url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getfolderbyserverrelativeurl('/sites/Workspace_Dev/WebPart/asset/config')/Files/add(overwrite=true, url='" + _spPageContextInfo.userId + _spPageContextInfo.userEmail + ".json')";
                        jQuery.ajax({
                            url: url,
                            type: "POST",
                            data: content,
                            headers: {
                                "accept": "application/json;odata=verbose",
                                "X-RequestDigest": digest
                            },
                            success: function (data) {
                                console.log('sukses')
                            },
                            error: function (data) {
                                console.log('result')
                                console.log(data);
                            }
                        });
                    }
                })
            } else if (location == 'listWorkspaceAll') {
                $.ajax({
                    url: _spPageContextInfo.webAbsoluteUrl + "/_api/contextinfo",
                    type: "POST",
                    headers: {
                        "Accept": "application/json;odata=verbose"
                    },
                    success: function (data) {
                        var digest = data.d.GetContextWebInformation.FormDigestValue;
                        var url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getfolderbyserverrelativeurl('/sites/Workspace_Dev/WebPart/asset/config')/Files/add(overwrite=true, url='listAllWorkspace.json')";
                        jQuery.ajax({
                            url: url,
                            type: "POST",
                            data: content,
                            headers: {
                                "accept": "application/json;odata=verbose",
                                "X-RequestDigest": digest
                            },
                            success: function (data) {
                                console.log('sukses')
                            },
                            error: function (data) {
                                console.log('result')
                                console.log(data);
                            }
                        });
                    }
                })
            }
            else if (location = 'logLogin'){
                console.log('ini')
                console.log(content)
                $.ajax({
                    url: _spPageContextInfo.webAbsoluteUrl + "/_api/contextinfo",
                    type: "POST",
                    headers: {
                        "Accept": "application/json;odata=verbose"
                    },
                    success: function (data) {
                        var digest = data.d.GetContextWebInformation.FormDigestValue;
                        var url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getfolderbyserverrelativeurl('/sites/Workspace_Dev/WebPart/asset/config/log/')/Files/add(overwrite=true, url='"+date+_spPageContextInfo.userId+_spPageContextInfo.userEmail+"LogAkses.json')";
                        jQuery.ajax({
                            url: url,
                            type: "POST",
                            data: content,
                            headers: {
                                "accept": "application/json;odata=verbose",
                                "X-RequestDigest": digest
                            },
                            success: function (data) {
                                console.log('sukses')
                            },
                            error: function (data) {
                                console.log('result')
                                console.log(data);
                            }
                        });
                    }
                })
            }
        },
        updateWorkspaceList() {
            console.log('update')
            this.workspaceList = []
            for (i in this.listParent) {
                if (this.listParent[i].ID !== undefined) {
                    this.workspaceList.push(this.listParent[i].ID)
                }
            }
            const obj = { workspace: this.workspaceList, GBI: this.workspaceList };
            console.log(this.savedList)
            this.savedList.workspace = this.workspaceList
            this.createJsonList(this.savedList, 'workspace')
        },
        getIndexAdvanceSort(item) {
            if (this.advanceSortSelected.indexOf(item) != -1) {
                return this.advanceSortSelected.indexOf(item) + 1
            }
        },
        makeFolder: function (item) {
            Vue.set(item, "children", []);
            this.addItem(item);
            this.isFolderClicked = true;
        },
        addItem: function (item) {
            item.children.push({
                name: "new stuff",
            });
            this.isFolderClicked = true;
        },
        setPersonal: function (status) {
            if (status == 'true') {
                this.isPersonal = true
            } else {
                this.isPersonal = false
            }
        },
        injectSort() {
            if (this.advanceSortSelectedTemp !== undefined) {
                if (this.fixedAdvanceSort.length == 0) {
                    this.fixedAdvanceSort.push([this.advanceSortSelectedTemp[0], 'asc'])
                    this.tempSort.push(this.advanceSortSelectedTemp[0])
                } else {

                    var x = this.advanceSortSelectedTemp.filter(element => !this.tempSort.includes(element));
                    var y = this.tempSort.filter(element => !this.advanceSortSelectedTemp.includes(element));
                    console.log(x)
                    console.log(y)
                    var index
                    if (y.length > 0) {
                        for (i in this.fixedAdvanceSort) {
                            for (j in y) {
                                index = this.fixedAdvanceSort[i].indexOf(y[j]);
                                if (index > -1) {
                                    this.fixedAdvanceSort.splice(i, 1);
                                }
                            }
                        }
                        index = -1
                        for (i in y) {
                            index = this.tempSort.indexOf(y[i]);
                            if (index > -1) {
                                this.tempSort.splice(index, 1);
                            }
                        }
                    }
                    for (i in x) {
                        this.fixedAdvanceSort.push([x[i], 'asc'])
                        this.tempSort.push(x[i])
                    }
                    console.log(this.fixedAdvanceSort)
                }
            }
        },
        resetSelectedFilter() {
            this.filterSatkerSelected = []
            this.filterPsSelected = []
            this.filterEventSelected = []
            this.filterTipeDokumenSelected = []
            this.filterVersiSelected = []
            this.filterKeywordSelected = []
            this.filterExtensionSelected = []
        },
        resetFilter() {
            this.isFiltered = false
            this.filterSatkerSelected = []
            this.filterPsSelected = []
            this.filterEventSelected = []
            this.filterTipeDokumenSelected = []
            this.filterVersiSelected = []
            this.filterKeywordSelected = []
            this.filterExtensionSelected = []
            this.filterSatker = []
            this.filterPs = []
            this.filterEvent = []
            this.filterPresenter = []
            this.filterTipeDokumen = []
            this.filterVersi = []
            this.filterKeyword = []
            this.filterExtension = []
            this.filteredFile = []
        },
        clickedBoss: function (parent) {
            //reset filter 
            console.log(parent)
            let status = false
            this.selectedIdParent = parent.ID
            this.parentActive = parent.name
            this.parentActiveUri = parent.ServerRelativeUrl
            const found = this.listOriginalParent.find(el => el.ListItemAllFields.ID === parent.ID);
            console.log('ketemu?')
            console.log(found)
            if (found != undefined) {
                parent = found
                this.fileSelected = []
                this.listDownload = []
                this.resetSort()
                this.resetFilter()
                this.linkFolder = ''
                this.parentActive = parent.Name
                this.parentActiveUri = parent.ServerRelativeUrl
                this.onFileSearch = false
                this.listSearchFileDoclib = []
                this.isFolderLoading = true;
                this.isclicked = false;
                this.isParentClicked = true;
                this.listFolder = [];
                this.dataDict = [];
                this.getParent(parent, 'folder');
                this.getChild(parent, 'file');
                this.selectedParent = parent
                this.onFolderSearch = false
                this.isFolderClicked = false;
            }
            else {
                this.txtRequest=''
                this.isCopyModalChoosed = false
                this.isDownloadModalClicked = false
                this.isRequestModalClicked = true
                this.isDownload = false
                let modalCopy = document.getElementById("universalModal");
                modalCopy.style.display = "block";
            }
        },
        addItemToRequestAccess() {
            $.ajax({
                url: "https://dokumen.bi.go.id/sites/Workspace_Dev/_api/web/lists/getbytitle('Access Request')/items?$filter=(IdUser eq " + _spPageContextInfo.userId + ") and (IdFolder eq " + this.selectedIdParent + ") ",
                type: "GET",
                context: this,
                headers: { "accept": "application/json;odata=verbose" },
                success: function onSuccess(data) {
                    if (data.d.results.length>0){
                    console.log('sukses')
                    let ReqCount = data.d.results[0].NumberOfRequest + 1
                    let listId = data.d.results[0].ID
                    console.log(data.d.results[0].NumberOfRequest)
                    $.ajax
                        ({
                            // _spPageContextInfo.webAbsoluteUrl - will give absolute URL of the site where you are running the code.
                            // You can replace this with other site URL where you want to apply the function
                            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('Access Request')/items(" + listId + ")",
                            type: "POST",
                            headers:
                            {
                                // Accept header: Specifies the format for response data from the server.
                                "Accept": "application/json;odata=verbose",
                                //Content-Type header: Specifies the format of the data that the client is sending to the server
                                "Content-Type": "application/json;odata=verbose",
                                // IF-MATCH header: Provides a way to verify that the object being changed has not been changed since it was last retrieved.
                                // "IF-MATCH":"*", will overwrite any modification in the object, since it was last retrieved.
                                "IF-MATCH": "*",
                                //X-HTTP-Method:  The MERGE method updates only the properties of the entity , while the PUT method replaces the existing entity with a new one that you supply in the body of the POST
                                "X-HTTP-Method": "MERGE",
                                // X-RequestDigest header: When you send a POST request, it must include the form digest value in X-RequestDigest header
                                "X-RequestDigest": $("#__REQUESTDIGEST").val()
                            },
                            data: JSON.stringify({
                                __metadata:
                                {
                                    // Format of the "type" is: SP.Data.<<ListName>>ListItem. First character of the <<ListName>> should be in Capital
                                    type: "SP.Data.Request_x0020_AccessListItem"
                                },
                                NumberOfRequest: ReqCount,
                                Message:this.txtRequest
                            }),
                            success: function (data, status, xhr) {
                                console.log("Success");
                                this.txtRequest=''
                            },
                            error: function (xhr, status, error) {
                                console.log("Failed");
                            }
                        });
                    }else{
                        var itemProperties = { 'IdUser': _spPageContextInfo.userId, 'IdFolder': this.selectedIdParent, 'Message': this.txtRequest, 'NumberOfRequest': 1 };
                    this.createListItem(_spPageContextInfo.webAbsoluteUrl, 'Access Request', itemProperties,
                        function (entity) { console.log('New task ' + entity.Title + ' has been created'), this.txtRequest=''}, function (error) { console.log(JSON.stringify(error)) })
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.log('error')
                    
                },
            });
        },
        createListItem(siteUrl, listName, itemProperties, success, failure) {
            //approved = "SP.Data.Approved_x0020_AccessListItem"
            //request = "SP.Data.Request_x0020_AccessListItem"
            itemProperties["__metadata"] = { "type": "SP.Data.Request_x0020_AccessListItem" };

            $.ajax({
                url: siteUrl + "/_api/web/lists/getbytitle('" + listName + "')/items",
                type: "POST",
                contentType: "application/json;odata=verbose",
                data: JSON.stringify(itemProperties),
                headers: {
                    "Accept": "application/json;odata=verbose",
                    "X-RequestDigest": $("#__REQUESTDIGEST").val()
                },
                success: function (data) {
                    success(data.d);
                },
                error: function (data) {
                    failure(data);
                }
            });
        },
        folderClicked: function () {
            this.isFolderClicked = true;
        },
        makeChild: function (item) {
            this.isclicked = !this.isclicked;
            this.isFolderClicked = true;
        },
        getParent: function (parent, location) {

            $.ajax({
                url: parent.Folders.__deferred.uri + "?$expand=ListItemAllFields",
                type: "GET",
                context: this,
                headers: { "accept": "application/json;odata=verbose" },
                success: function onSuccess(data) {
                    this.responseFolder = data.d.results;
                    this.sorting(this.responseFolder)
                    this.normalize(this.responseFolder, parent, null, location);
                }
            });

        },
        getChild: function (parent, location) {
            urlAsli = parent.Files.__deferred.uri
            if (location == 'file') {
                this.listFile = []
            } if (location == 'filePersonal') {
                this.listFileModal = []
            }
            $.ajax({
                url: urlAsli,
                type: "GET",
                context: this,
                headers: { "accept": "application/json;odata=verbose" },
                success: function onSuccess(data) {

                    this.responseFolder = data.d.results;
                    this.sorting(this.responseFolder)

                    this.normalize(this.responseFolder, parent, null, location);
                }
            });

        },
        childCall: function (parent, location) {

            if (!this.isParentClicked) {
                urlAsli = parent.folderUri + "?$expand=ListItemAllFields"
                // let obj = this.dataDict.find(o => o.folderLocation === parent.folderLocation);
                // let urlAsli =null;
                // if(obj){
                //     urlAsli = obj.folderUri
                // }else
                // urlAsli = "http://dc1consdbs63/sites/testSearching/_api/Web/GetFolderByServerRelativePath(decodedurl='/sites/testSearching/yuliantoDoc/"+parent.name+"')/Folders"
                $.ajax({
                    url: urlAsli,
                    type: "GET",
                    context: this,
                    headers: { "accept": "application/json;odata=verbose" },
                    success: function onSuccess(data) {
                        this.responseFolder = data.d.results;
                        this.sorting(this.responseFolder)
                        this.normalize(this.responseFolder, parent, null, location);
                    }
                });
            } else {
                this.normalize(null, parent, null, location)
            }
        },
        fileCall: function (uriFolder, location) {
            // let obj = this.dataDict.find(o => o.name === uriFolder.name);
            // let urlAsli =null;
            if (location == 'file') {
                this.listFile = []
            } if (location == 'filePersonal') {
                this.listFileModal = []
            }
            // if(obj){
            //   let obj2 = this.dataDict.find(o => o.name === uriFolder.name);
            //     urlAsli = obj.filesUri
            // }else
            // urlAsli = uriFolder.filesUri
            urlAsli = uriFolder.filesUri + "?$expand=ListItemAllFields,Author,Properties,ListItemAllFields/FieldValuesAsText"
            // urlAsli = "http://dc1consdbs63/sites/testSearching/_api/Web/GetFolderByServerRelativePath(decodedurl='/sites/testSearching/yuliantoDoc/"+uriFolder.name+"')/Files"
            $.ajax({
                url: urlAsli,
                type: "GET",
                context: this,
                headers: { "accept": "application/json;odata=verbose" },
                success: function onSuccess(data) {
                    this.responseFile = data.d.results;
                    if (this.responseFile.length > 0) {
                        if (location == 'file') {
                            this.isFileEmpty = false
                        } if (location == 'filePersonal') {
                            this.isModalFileEmpty = false
                        }

                        this.normalize(this.responseFile, uriFolder, null, location);
                        // for (i in this.responseFile) {
                        //   let obj = this.listMetadata.find(o => o.folder === uriFolder.name);
                        //   if (obj == undefined) {
                        //     this.getMetadataFile(this.responseFile[i], uriFolder)
                        //   }
                        // }
                    }
                    else {
                        if (location == 'file') {
                            this.isFileLoading = false
                            this.isFileEmpty = true
                        } if (location == 'filePersonal') {
                            this.isModalFileLoading = false
                            this.isModalFileEmpty = true
                        }

                    }

                }
            });
        },
        getMetadataFile: function (response, parent) {
            var urlAsli = response.ListItemAllFields.__deferred.uri
            $.ajax({
                url: urlAsli,
                type: "GET",
                context: this,
                headers: { "accept": "application/json;odata=verbose" },
                success: function onSuccess(data) {
                    var result = data.d
                    //  this.listMetadata.push({name:response.Name,folder:parent.name, metadata:data.d})
                    this.normalize(response, parent, result, "file");
                }
            });
        },
        setDetail: function (detail) {
            this.sortSelected = ''
            this.detailFilter = detail
        },
        filterFile: async function () {
            if (this.filterSatkerSelected.length > 0 || this.filterPsSelected.length > 0 || this.filterEventSelected.length > 0 || this.filterTipeDokumenSelected.length > 0 || this.filterVersiSelected.length > 0 || this.filterKeywordSelected.length > 0 || this.filterExtensionSelected.length > 0) {
                this.isFiltered = true
                // if(this.findAllDoclib){
                //   this.onFileSearch = false
                // }
            } else {
                // if(this.findAllDoclib){
                //   this.onFileSearch = true
                // }
                this.isFiltered = false
            }
            this.filteredFile = []
            var temp = []
            if (this.findAllDoclib) {
                console.log('listSearchFile')
                console.log(this.listSearchFileDoclib)
                var file = this.listSearchFileDoclib
                const satker = this.listSearchFileDoclib.filter(item => this.filterSatkerSelected.includes(item.metadata.satkerPembuat));
                const ps = this.listSearchFileDoclib.filter(item => this.filterPsSelected.includes(item.metadata.PS));
                const event = this.listSearchFileDoclib.filter(item => this.filterEventSelected.includes(item.metadata.Event));
                const tipeDokumen = this.listSearchFileDoclib.filter(item => this.filterTipeDokumenSelected.includes(item.metadata.tipeDokumen));
                const versi = this.listSearchFileDoclib.filter(item => this.filterVersiSelected.includes(item.metadata.Versi));

                const withoutNull = this.listSearchFileDoclib.filter(v => v.metadata.keyword !== null);
                const keyword = withoutNull.filter(item => this.filterKeywordSelected.every(substring => item.metadata.keyword.includes(substring)));
                const jenis = this.listSearchFileDoclib.filter(item => this.filterExtensionSelected.includes(item.tipe));

                if (satker.length > 0) {
                    file = file.filter(item => satker.includes(item));
                }
                if (ps.length > 0) {
                    file = file.filter(item => ps.includes(item));
                }
                if (event.length > 0) {
                    file = file.filter(item => event.includes(item));
                }
                if (tipeDokumen.length > 0) {
                    file = file.filter(item => tipeDokumen.includes(item));
                }
                if (versi.length > 0) {
                    file = file.filter(item => versi.includes(item));
                }
                if (keyword.length > 0) {
                    file = file.filter(item => keyword.includes(item));
                }
                if (jenis.length > 0) {
                    file = file.filter(item => jenis.includes(item));
                }
                this.filteredFile = file
                console.log(this.filteredFile)
                this.backdoor++
            } else {
                var file = this.listFile
                const satker = this.listFile.filter(item => this.filterSatkerSelected.includes(item.metadata.satkerPembuatId));
                const ps = this.listFile.filter(item => this.filterPsSelected.includes(item.metadata.PSId));
                const event = this.listFile.filter(item => this.filterEventSelected.includes(item.metadata.EventId));
                const tipeDokumen = this.listFile.filter(item => this.filterTipeDokumenSelected.includes(item.metadata.tipeDokumenId));
                const versi = this.listFile.filter(item => this.filterVersiSelected.includes(item.metadata.Versi));

                const withoutNull = this.listFile.filter(v => v.metadata.Keyword !== null);
                const keyword = withoutNull.filter(item => this.filterKeywordSelected.every(substring => item.metadata.Keyword.includes(substring)));
                const jenis = this.listFile.filter(item => this.filterExtensionSelected.includes(item.tipe));

                if (satker.length > 0) {
                    file = file.filter(item => satker.includes(item));
                }
                if (ps.length > 0) {
                    file = file.filter(item => ps.includes(item));
                }
                if (event.length > 0) {
                    file = file.filter(item => event.includes(item));
                }
                if (tipeDokumen.length > 0) {
                    file = file.filter(item => tipeDokumen.includes(item));
                }
                if (versi.length > 0) {
                    file = file.filter(item => versi.includes(item));
                }
                if (keyword.length > 0) {
                    file = file.filter(item => keyword.includes(item));
                }
                if (jenis.length > 0) {
                    file = file.filter(item => jenis.includes(item));
                }
                this.filteredFile = file
                console.log(this.filteredFile)
            }
        },
        advanceSearchPath(item) {
            var x = item.replace("https://dokumen.bi.go.id/sites/documentCenter_DGdoc/Shared Documents", "~")
            x = x.replace("https://dokumen.bi.go.id/sites/mysite", "~")
            return x
        },
        normalize: function (responseData, parent, metadata, source) {
            var server = _spPageContextInfo.webAbsoluteUrl;
            const myArr = server.split("/", 3);
            if (this.isParentClicked) {
                if (source == "folder") {

                    this.listFolder = { name: parent.Name, level: 0, children: [], filesUri: parent.Files.__deferred.uri, folderId: myArr[0] + '/' + myArr[1] + '/' + myArr[2] + parent.ServerRelativeUrl, folderLocation: myArr[0] + '/' + myArr[1] + '/' + myArr[2] + parent.ServerRelativeUrl, folderUri: parent.Folders.__deferred.uri, folderLocation: myArr[0] + '/' + myArr[1] + '/' + myArr[2] + parent.ServerRelativeUrl, metadata: parent.ListItemAllFields }

                    // this.dataDict.push({ name: parent.Name, level: 1, filesUri: parent.Files.__deferred.uri, folderUri: parent.Folders.__deferred.uri, folderLocation: myArr[0] + '/' + myArr[1] + '/' + myArr[2] + parent.ServerRelativeUrl })
                    this.isParentClicked = false;
                    this.isFolderLoading = false;
                    this.isclicked = true;
                }
                if (source == "personal") {
                    console.log(parent)
                    this.listPersonalTreeView = { name: parent.Name, level: 0, children: [], filesUri: parent.Files, folderId: 'copy' + parent.folderLocation, folderUri: parent.Folders, folderLocation: parent.folderLocation, metadata: parent.metadata }
                    console.log(this.listPersonalTreeView)
                    this.isParentClicked = false;
                    this.isFolderLoading = false;
                    this.isclickedPersonal = true;
                }
            } else {
                if (source == "folder") {
                    if (!parent.childen) {
                        Vue.set(parent, "children", []);
                    }
                    for (x in responseData) {
                        if (responseData[x].Name.toLowerCase() != 'forms') {
                            parent.children.push({ name: responseData[x].Name, level: 1, filesUri: responseData[x].Files.__deferred.uri, folderId: myArr[0] + "/" + myArr[1] + "/" + myArr[2] + responseData[x].ServerRelativeUrl, folderUri: responseData[x].Folders.__deferred.uri, folderLocation: myArr[0] + "/" + myArr[1] + "/" + myArr[2] + responseData[x].ServerRelativeUrl, metadata: responseData[x].ListItemAllFields })
                        }
                    }
                    this.isFolderLoading = false;
                    this.isParentClicked = false;
                    this.isclicked = true;
                } else if (source == "file") {
                    console.log(responseData)
                    var res = []
                    var word = []
                    var temp2 = []
                    var temp = ''
                    var tipe = ''
                    var temp = ''
                    var satker = []
                    var event = []
                    var listSatkerTitle = []
                    var dokumen = []
                    var ps = []
                    var keyword = []
                    var extension = []
                    this.filterSatker = []
                    this.filterPs = []
                    this.filterEvent = []
                    this.filterTipeDokumen = []
                    this.filterExtension = []
                    this.filterKeyword = []
                    this.filterVersi = []
                    var blacklist = this.blacklistKeyword.map(v => v.toLowerCase());
                    for (i in this.listSatker) {
                        listSatkerTitle.push(this.listSatker[i].Title.toLowerCase())
                    }
                    // console.log(responseData)
                    for (i in responseData) {

                        if (responseData[i].Name) {
                            tipe = responseData[i].Name.split(".")
                            tipe = tipe[1].toLowerCase()
                        }

                        if (true) {
                            if (satker.indexOf(responseData[i].ListItemAllFields.satkerPembuatId) === -1) {
                                if (responseData[i].ListItemAllFields.satkerPembuatId != null) {
                                    satker.push(responseData[i].ListItemAllFields.satkerPembuatId)
                                    temp3 = this.listSatker.filter(x => x.Id === responseData[i].ListItemAllFields.satkerPembuatId)
                                    this.filterSatker.push([temp3[0].Title, responseData[i].ListItemAllFields.satkerPembuatId])
                                }
                            }
                            if (ps.indexOf(responseData[i].ListItemAllFields.PSId) === -1) {
                                if (responseData[i].ListItemAllFields.PSId != null) {
                                    ps.push(responseData[i].ListItemAllFields.PSId)
                                    temp3 = this.listPs.filter(x => x.Id === responseData[i].ListItemAllFields.PSId)
                                    this.filterPs.push([temp3[0].Title, responseData[i].ListItemAllFields.PSId])
                                }
                            }
                            if (event.indexOf(responseData[i].ListItemAllFields.EventId) === -1) {
                                if (responseData[i].ListItemAllFields.EventId != null) {
                                    event.push(responseData[i].ListItemAllFields.EventId)
                                    temp3 = this.listEvent.filter(x => x.Id === responseData[i].ListItemAllFields.EventId)
                                    this.filterEvent.push([temp3[0].Title, responseData[i].ListItemAllFields.EventId])
                                }
                            }
                            if (dokumen.indexOf(responseData[i].ListItemAllFields.tipeDokumenId) === -1) {
                                if (responseData[i].ListItemAllFields.tipeDokumenId != null) {
                                    dokumen.push(responseData[i].ListItemAllFields.tipeDokumenId)
                                    temp3 = this.listDokumen.filter(x => x.Id === responseData[i].ListItemAllFields.tipeDokumenId)
                                    this.filterTipeDokumen.push([temp3[0].Title, responseData[i].ListItemAllFields.tipeDokumenId])
                                }
                            }
                            if (this.filterVersi.indexOf(responseData[i].ListItemAllFields.Versi) === -1 && responseData[i].ListItemAllFields.Versi != null) {
                                this.filterVersi.push(responseData[i].ListItemAllFields.Versi)
                            }
                            try {
                                temp2 = responseData[i].ListItemAllFields.Keyword.split(", ")

                                console.log('ieu boss')
                                // console.log(temp2)
                                for (z in temp2) {
                                    temp2[z] = temp2[z].replace(',', '')
                                }
                                // console.log(temp2)
                                res = temp2.filter(item => !keyword.includes(item));
                                for (a in res) {
                                    if (!listSatkerTitle.includes(res[a].toLowerCase()) && !blacklist.includes(res[a].toLowerCase())) {
                                        keyword.push(res[a])
                                    }

                                }
                            }
                            catch (err) {
                                console.log(err)
                            }

                            this.filterKeyword = keyword
                            this.filterExtension.indexOf(tipe) === -1 ? this.filterExtension.push(tipe) : temp = '';

                            this.listFile.push({ name: responseData[i].Name, level: 1, uri: myArr[0] + '/' + myArr[1] + '/' + myArr[2] + responseData[i].ServerRelativeUrl, metadata: responseData[i].ListItemAllFields, tipe: tipe, size: responseData[i].Length })

                        }
                        // else {

                        //   if (satker.indexOf(responseData[i].ListItemAllFields.satkerPembuat) === -1) {
                        //     satker.push(responseData[i].ListItemAllFields.satkerPembuat)
                        //     if (responseData[i].ListItemAllFields.satkerPembuat == null) {
                        //       // this.filterSatker.push(['empty',responseData[i].ListItemAllFields.satkerPembuat])
                        //     } else {
                        //       this.filterSatker.push([responseData[i].ListItemAllFields.satkerPembuat, responseData[i].ListItemAllFields.satkerPembuat])
                        //     }
                        //   }
                        //   if (ps.indexOf(responseData[i].ListItemAllFields.PS) === -1) {
                        //     ps.push(responseData[i].ListItemAllFields.PS)
                        //     if (responseData[i].ListItemAllFields.PS == null) {
                        //       // this.filterPs.push(['empty',responseData[i].ListItemAllFields.PS])
                        //     } else {
                        //       this.filterPs.push([responseData[i].ListItemAllFields.PS, responseData[i].ListItemAllFields.PS])
                        //     }
                        //   }
                        //   if (event.indexOf(responseData[i].ListItemAllFields.EventId) === -1) {
                        //     event.push(responseData[i].ListItemAllFields.EventId)
                        //     if (responseData[i].ListItemAllFields.EventId == null) {
                        //       // this.filterEvent.push(["empty",responseData[i].ListItemAllFields.Event])
                        //     } else {
                        //       this.filterEvent.push([responseData[i].ListItemAllFields.Event, responseData[i].ListItemAllFields.Event])
                        //     }

                        //   }
                        //   if (dokumen.indexOf(responseData[i].ListItemAllFields.tipeDokumen) === -1) {
                        //     dokumen.push(responseData[i].ListItemAllFields.tipeDokumen)
                        //     if (responseData[i].ListItemAllFields.tipeDokumen == null) {
                        //       // this.filterTipeDokumen.push(['empty',responseData[i].ListItemAllFields.tipeDokumen])
                        //     } else {
                        //       this.filterTipeDokumen.push([responseData[i].ListItemAllFields.tipeDokumen, responseData[i].ListItemAllFields.tipeDokumen])
                        //     }
                        //   }
                        //   if (this.filterVersi.indexOf(responseData[i].ListItemAllFields.Versi) === -1) {
                        //     // dokumen.push(responseData[i].ListItemAllFields.Versi)
                        //     if (responseData[i].ListItemAllFields.Versi == null) {
                        //       // this.filterTipeDokumen.push(['empty',responseData[i].ListItemAllFields.tipeDokumen])
                        //     } else {
                        //       this.filterVersi.push(responseData[i].ListItemAllFields.Versi)
                        //     }
                        //   }
                        //   // this.filterVersi.indexOf(responseData[i].ListItemAllFields.Versi) === -1 ? this.filterVersi.push(responseData[i].ListItemAllFields.Versi) : temp = '';
                        //   try {
                        //     temp2 = responseData[i].ListItemAllFields.Keyword.split(", ")
                        //     res = temp2.filter(item => !keyword.includes(item));
                        //     for (z in res) {
                        //       if (!listSatkerTitle.includes(res[z]) && !blacklist.includes(res[a].toLowerCase())) {
                        //         keyword.push(res[z])
                        //       }
                        //     }
                        //   }
                        //   catch (err) {
                        //     console.log('keyword kosong')
                        //   }

                        //   this.filterKeyword = keyword
                        //   this.filterExtension.indexOf(tipe) === -1 ? this.filterExtension.push(tipe) : temp = '';

                        //   this.listFile.push({ name: responseData[i].Name, level: 1, uri: myArr[0] + '/' + myArr[1] + '/' + myArr[2] + responseData[i].ServerRelativeUrl, metadata: responseData[i].ListItemAllFields, tipe: tipe, size: responseData[i].Length })
                        // }
                        this.isFileLoading = false
                    }
                } else if (source == "personal") {
                    if (!parent.childen) {
                        Vue.set(parent, "children", []);
                    }
                    for (x in responseData) {
                        if (responseData[x].Name != 'Forms') {
                            parent.children.push({ name: responseData[x].Name, level: 1, filesUri: responseData[x].Files.__deferred.uri, folderUri: responseData[x].Folders.__deferred.uri, folderId: "copy" + myArr[0] + "/" + myArr[1] + "/" + myArr[2] + responseData[x].ServerRelativeUrl, folderLocation: myArr[0] + "/" + myArr[1] + "/" + myArr[2] + responseData[x].ServerRelativeUrl, metadata: responseData[x].ListItemAllFields })
                        }
                    }
                    this.isFolderLoading = false;
                    this.isParentClicked = false;
                    this.isclickedPersonal = true;
                } else if (source == "filePersonal") {
                    var tipe = ''
                    for (i in responseData) {
                        if (responseData[i].Name) {
                            tipe = responseData[i].Name.split(".")
                            tipe = tipe[1].toLowerCase()
                        }
                        // obj = this.dataDict.find(o => o.name === responseData.Name);
                        // if (obj) {
                        //   this.listFile.push({ name: responseData.Name, level: 1, uri: myArr[0] + '/' + myArr[1] + '/' + myArr[2] + responseData.ServerRelativeUrl, metadata: responseData.ListItemAllFields, tipe: tipe })
                        // } else {
                        // this.dataDict.push({ name: responseData.Name, level: 1, uri: myArr[0] + '/' + myArr[1] + '/' + myArr[2] + responseData.ServerRelativeUrl, metadata: responseData.ListItemAllFields, tipe: tipe })
                        this.listFileModal.push({ name: responseData[i].Name, level: 1, uri: myArr[0] + '/' + myArr[1] + '/' + myArr[2] + responseData[i].ServerRelativeUrl, metadata: responseData[i].ListItemAllFields, tipe: tipe, size: responseData[i].Length })
                        // }
                        this.isModalFileLoading = false
                    }
                }
            }
        },
        expand: function (item) {
            console.log(item)
            this.isNavigating = true
            this.isGlobalSearch = false
            this.resetSort()
            this.resetFilter()
            this.choosedFolder = item
            this.choosedFolderMetadata = item.metadata
            this.onFileSearch = false
            this.listSearchFileDoclib = []
            if (!this.isFileLoading) {
                this.listDownload = []
                this.searchFile = ''
                this.isFileLoading = true
                this.childCall(item, 'folder')
                this.fileCall(item, 'file')
                this.linkFolder = item.folderLocation
                this.isFolderClicked = true;
            }
        },
        expandPersonal: function (item) {
            console.log('expand')
            console.log(item)
            // this.onFileSearch = false
            this.listSearchFileDoclib = []
            if (!this.isFileLoading && item.name != "Personal Workspace") {
                this.searchFile = ''
                this.isModalFileLoading = true
                // this.isFileLoading = true
                this.childCall(item, 'personal')
                this.fileCall(item, 'filePersonal')
                // obj = this.dataDict.find(o => o.folderLocation === item.folderLocation);
                // if(location == 'mainPage'){
                this.linkFolderPersonal = item.folderLocation
                // }else {
                // this.linkFolderPersonal = item.folderLocation
                // }
                this.isFolderClicked = true;
            }
        },
        openFolder: function (item) {
            if (item != null) {
                window.open(item, "_blank")
            } else
                alert("pilih folder terlebih dahulu")
        },
        downloadTemp: function () {
            this.isCopyModalChoosed = false
            this.isDownloadModalClicked = true
            this.isRequestModalClicked = false
            this.isDownload = true
            this.isUpload = false
            this.listDownloadTemp = this.listDownload
            let modalCopy = document.getElementById("universalModal");
            modalCopy.style.display = "block";

        },
        downloadAll: function (item) {
            if (this.listDownloadTemp.length > 0) {

                var interval = setInterval(download, 300, this.listDownloadTemp);
                this.listDownload = []
            } else {
                alert("silahkan pilih file")
            }
            function download(urls) {
                var url = urls.pop();

                var a = document.createElement("a");
                a.setAttribute('href', url[0]);
                a.setAttribute('download', '');
                a.setAttribute('target', '_blank');
                a.click();

                if (urls.length == 0) {
                    clearInterval(interval);
                }
            }
        },
        downloadsingle: function (uri) {
            var a = document.createElement("a");
            a.setAttribute('href', uri);
            a.setAttribute('download', '');
            a.setAttribute('target', '_blank');
            a.click();
        },
        checkBoxClicked: function () {
            if (this.listDownload.length == 0) {
                this.isSelectedFile = false;
            } else {
                this.isSelectedFile = true;
            }
        },
        sorting(item) {
            function compare(a, b) {
                if (a.Name < b.Name) {
                    return -1;
                }
                if (a.Name > b.Name) {
                    return 1;
                }
                return 0;
            }
            item.sort(compare);
        },
        searchClicked: function () {
            $.ajax({
                // [site]/_api/search/query?querytext='timesheets'
                url: "https://dokumen.bi.go.id/sites/Workspace_Dev/_api/search/query?querytext='path:https://dokumen.bi.go.id/sites/Workspace_Dev/DocLib AND " + this.searchField + "'&rowlimit=50",
                type: "GET",
                context: this,
                headers: { "accept": "application/json;odata=verbose" },
                success: function onSuccess(data) {
                    this.resultSearch = data.d.query.PrimaryQueryResult.RelevantResults
                }
            });
        },
        searchFolderClicked: function () {
            if (!!this.searchFolder.trim()) {
                this.findAllDoclib = false
                this.onFolderSearch = true
                this.resultFolderSearch = []
                var arr = []
                var server = _spPageContextInfo;
                const myArr = server.webAbsoluteUrl.split("/", 3);
                let site = myArr[0] + '/' + myArr[1] + '/' + myArr[2]
                this.isclicked = false
                this.isFolderLoading = true
                $.ajax({
                    // [site]/_api/search/query?querytext='timesheets'
                    url: "https://dokumen.bi.go.id/sites/documentCenter_DGdoc/_api/search/query?querytext='path:https://dokumen.bi.go.id/sites/documentCenter_DGdoc AND title:" + this.searchFolder + " AND IsContainer:true'&rowlimit=50",
                    type: "GET",
                    context: this,
                    headers: { "accept": "application/json;odata=verbose" },
                    success: function onSuccess(data) {
                        // results[0].Cells.results
                        this.responseSearch = data.d.query.PrimaryQueryResult.RelevantResults.Table.Rows.results
                        for (i in this.responseSearch) {
                            var tempPath = ''
                            let title = this.responseSearch[i].Cells.results.find(o => o.Key === 'Title');
                            let path = this.responseSearch[i].Cells.results.find(o => o.Key === 'Path');
                            var temp = path.Value
                            var pathView = path.Value.replace("https://dokumen.bi.go.id/sites/documentCenter_DGdoc/Shared Documents/", "")
                            arr = pathView.split('/')
                            for (i in arr) {
                                if (i == arr.length - 1) {
                                    break
                                }
                                tempPath = tempPath + arr[i] + '/'
                            }
                            temp = temp.replace(site, '');
                            temp = temp.replace(' ', '%20')
                            this.resultFolderSearch.push({ name: title.Value, path: path.Value, pathView: '~' + tempPath, filesUri: "https://dokumen.bi.go.id/sites/documentCenter_DGdoc/_api/Web/GetFolderByServerRelativePath(decodedurl='" + temp + "')/Files" })
                        }
                        this.isSearchLoading = false
                        this.isFolderLoading = false
                    }
                });
            } else {
                alert('search field kosong')
            }
        },
        searchModalFolderClicked: function () {
            if (!!this.searchModalFolder.trim()) {
                // this.findAllDoclib = false
                this.onModalFolderSearch = true
                this.resultFolderSearch = []
                var arr = []
                var server = _spPageContextInfo;
                const myArr = server.webAbsoluteUrl.split("/", 3);
                let site = myArr[0] + '/' + myArr[1] + '/' + myArr[2]
                // this.isclicked = false
                this.isModalFolderLoading = true
                $.ajax({
                    // [site]/_api/search/query?querytext='timesheets'
                    url: "https://dokumen.bi.go.id/sites/documentCenter_DGdoc/_api/search/query?querytext='path:https://dokumen.bi.go.id/sites/mysite/personal/" + this.personalUrl + "/personal Lib/Personal AND title:" + this.searchModalFolder + " AND IsContainer:true'&rowlimit=50",
                    type: "GET",
                    context: this,
                    headers: { "accept": "application/json;odata=verbose" },
                    success: function onSuccess(data) {
                        // results[0].Cells.results
                        this.responseSearch = data.d.query.PrimaryQueryResult.RelevantResults.Table.Rows.results
                        for (i in this.responseSearch) {
                            var tempPath = ''
                            let title = this.responseSearch[i].Cells.results.find(o => o.Key === 'Title');
                            let path = this.responseSearch[i].Cells.results.find(o => o.Key === 'Path');
                            var temp = path.Value
                            var pathView = path.Value.replace("https://dokumen.bi.go.id/sites/mysite/personal/" + this.personalUrl + "/personal Lib/Personal", "")
                            arr = pathView.split('/')
                            for (i in arr) {
                                if (i == arr.length - 1) {
                                    break
                                }
                                tempPath = tempPath + arr[i] + '/'
                            }
                            temp = temp.replace(site, '');
                            temp = temp.replace(' ', '%20')
                            this.resultModalFolderSearch.push({ name: title.Value, path: path.Value, pathView: '~' + tempPath, filesUri: "https://dokumen.bi.go.id/sites/mysite/personal/" + this.personalUrl + "/_api/Web/GetFolderByServerRelativePath(decodedurl='" + temp + "')/Files" })
                        }
                        this.isSearchLoading = false
                        this.isModalFolderLoading = false
                    }
                });
            } else {
                alert('search field kosong')
            }
        },
        searchItemFolderClicked: function (item) {
            this.isFileLoading = true
            this.fileCall(item, 'file')
            this.linkFolder = item.path
            this.isFolderClicked = true;
        },
        searchFileTyped: function () {
            if (!this.isPersonal) {
                this.listSearchFileDoclib = []
                this.onFileSearch = true
            } else {
                this.onModalFileSearch = true
            }
        },
        searchFileClicked: function () {
            if (this.findAllDoclib) {
                this.resetFilter()
                this.listSearchFileDoclib = []
                this.isFileLoading = true
                this.onFileSearch = true
                var res = []
                var word = []
                var temp2 = []
                var tipe = ''
                var temp = ''
                var satker = []
                var event = []
                var listSatkerTitle = []
                var dokumen = []
                var psTemp = []
                var keyword = []
                var extension = []
                var metadata = {}
                for (i in this.listSatker) {
                    listSatkerTitle.push(this.listSatker[i].Title.toLowerCase())
                }
                var blacklist = this.blacklistKeyword.map(v => v.toLowerCase());

                // var uri = "https://dokumen.bi.go.id/sites/documentCenter_DGdoc/_api/search/query?querytext='path:https://dokumen.bi.go.id/sites/documentCenter_DGdoc/Shared Documents/"+this.parentActive+" AND title:" + this.searchFile + " AND IsDocument:true'&rowlimit=50"
                // 
                // var uri = "https://dokumen.bi.go.id/sites/documentCenter_DGdoc/_api/search/query?querytext='(title%3a"+this.searchFile+"+AND+path%3ahttps%3a%2f%2fdokumen.bi.go.id%2fsites%2fdocumentCenter_DGdoc%2fShared%2520Documents%2f"+this.parentActive+")+AND+isDocument%3atrue'&rowlimit=50&clienttype='ContentSearchRegular'"
                uri = "https://dokumen.bi.go.id/sites/documentCenter_DGdoc/_api/search/query?querytext='(path:\"https://dokumen.bi.go.id" + this.parentActiveUri + "\") AND title:" + this.searchFile + "'&rowlimit=50&selectproperties='Event%2cPS%2csatkerPembuat%2ctipeDokumen%2cPresenter%2cKeywordFile%2cnamaTopik%2ctanggalPelaksanaan%2cVersi'&sortlist='Rank%3adescending'"
                console.log(uri)
                $.ajax({
                    // [site]/_api/search/query?querytext='timesheets'
                    // https://dokumen.bi.go.id/sites/documentCenter_DGdoc/_api/search/query?querytext='path:https://dokumen.bi.go.id/sites/documentCenter_DGdoc AND title:"+this.searchFolder+" AND IsContainer:true'&rowlimit=50
                    url: uri,
                    type: "GET",
                    context: this,
                    headers: { "accept": "application/json;odata=verbose" },
                    success: function onSuccess(data) {
                        // this.responseSearch = data.d.query.PrimaryQueryResult.RelevantResults.Table.Rows.results
                        console.log('ini')
                        console.log(data.d.query.PrimaryQueryResult.RelevantResults.Table.Rows.results)
                        for (i in data.d.query.PrimaryQueryResult.RelevantResults.Table.Rows.results) {
                            let item = data.d.query.PrimaryQueryResult.RelevantResults.Table.Rows.results[i]
                            let title = item.Cells.results.find(o => o.Key === 'Title');
                            let path = item.Cells.results.find(o => o.Key === 'Path');
                            let size = item.Cells.results.find(o => o.Key === 'Size');
                            let tipe = item.Cells.results.find(o => o.Key === 'FileExtension');
                            let parentFolder = item.Cells.results.find(o => o.Key === 'ParentLink');
                            let encodingUrl = item.Cells.results.find(o => o.Key === 'DefaultEncodingURL');
                            let temp = encodingUrl.Value.replace('https://dokumen.bi.go.id', '')
                            let Event = item.Cells.results.find(o => o.Key === 'Event');
                            let ps = item.Cells.results.find(o => o.Key === 'PS');
                            let satkerPembuat = item.Cells.results.find(o => o.Key === 'satkerPembuat');
                            let tipeDokumen = item.Cells.results.find(o => o.Key === 'tipeDokumen');
                            let Presenter = item.Cells.results.find(o => o.Key === 'Presenter');
                            let Keyword = item.Cells.results.find(o => o.Key === 'KeywordFile');
                            let Versi = item.Cells.results.find(o => o.Key === 'Versi');
                            let namaTopik = item.Cells.results.find(o => o.Key === 'namaTopik');
                            let tanggalPelaksanaan = item.Cells.results.find(o => o.Key === 'tanggalPelaksanaan');
                            let author = item.Cells.results.find(o => o.Key === 'DisplayAuthor');
                            let modified = item.Cells.results.find(o => o.Key === 'LastModifiedTime');
                            let created = item.Cells.results.find(o => o.Key === 'Created');
                            let modifikator = item.Cells.results.find(o => o.Key === 'ModifiedBy');


                            if (satker.indexOf(satkerPembuat.Value) === -1) {
                                satker.push(satkerPembuat.Value)
                                if (satkerPembuat.Value == null) {
                                    // this.filterSatker.push(['empty',responseData[i].ListItemAllFields.satkerPembuat])
                                } else {
                                    this.filterSatker.push([satkerPembuat.Value, satkerPembuat.Value])
                                }
                            }
                            if (psTemp.indexOf(ps.Value) === -1) {
                                psTemp.push(ps.Value)
                                if (ps.Value == null) {
                                    // this.filterPs.push(['empty',responseData[i].ListItemAllFields.PS])
                                } else {
                                    this.filterPs.push([ps.Value, ps.Value])
                                }
                            }
                            if (event.indexOf(Event.Value) === -1) {
                                event.push(Event.Value)
                                if (Event.Value == null) {
                                    // this.filterEvent.push(["empty",responseData[i].ListItemAllFields.Event])
                                } else {
                                    this.filterEvent.push([Event.Value, Event.Value])
                                }

                            }
                            if (dokumen.indexOf(tipeDokumen.Value) === -1) {
                                dokumen.push(tipeDokumen.Value)
                                if (tipeDokumen.Value == null) {
                                    // this.filterTipeDokumen.push(['empty',responseData[i].ListItemAllFields.tipeDokumen])
                                } else {
                                    this.filterTipeDokumen.push([tipeDokumen.Value, tipeDokumen.Value])
                                }
                            }
                            if (this.filterVersi.indexOf(Versi.Value) === -1) {
                                // dokumen.push(responseData[i].ListItemAllFields.Versi)
                                if (Versi.Value == null) {
                                    // this.filterTipeDokumen.push(['empty',responseData[i].ListItemAllFields.tipeDokumen])
                                } else {
                                    this.filterVersi.push(Versi.Value)
                                }
                            }
                            // this.filterVersi.indexOf(responseData[i].ListItemAllFields.Versi) === -1 ? this.filterVersi.push(responseData[i].ListItemAllFields.Versi) : temp = '';
                            console.log('keyword')
                            console.log(Keyword.Value)
                            try {
                                temp2 = Keyword.Value.split(", ")
                                res = temp2.filter(item => !keyword.includes(item));
                                for (z in res) {
                                    if (!listSatkerTitle.includes(res[z].toLowerCase()) && !blacklist.includes(res[z].toLowerCase())) {
                                        keyword.push(res[z])
                                    }
                                }
                            }
                            catch (err) {
                                console.log('keyword kosong')
                            }

                            this.filterKeyword = keyword
                            this.filterExtension.indexOf(tipe.Value) === -1 ? this.filterExtension.push(tipe.Value) : temp = '';
                            metadata = { namaTopik: namaTopik.Value, Presenter: Presenter.Value, Event: Event.Value, PS: ps.Value, satkerPembuat: satkerPembuat.Value, tipeDokumen: tipeDokumen.Value, keyword: Keyword.Value, tanggalPelaksanaan: tanggalPelaksanaan.Value, Versi: Versi.Value, Author: author.Value, Modified: modified.Value, Created: created.Value, modifikator: modifikator.Value }
                            this.listSearchFileDoclib.push({ name: title.Value, uri: path.Value, tipe: tipe.Value, parentFolder: parentFolder.Value, metadata: metadata, size: size.Value })
                        }

                        this.searchFileDoclibFinish = true
                        this.searchFileDoclib = true
                        this.isSearchLoading = false
                        this.isFileLoading = false

                        // this.backdoor++
                    }
                });
            } else {
                this.onFileSearch = true
            }
        },
        detailMetadataSearch: function (item) {
            let title = item.Cells.results.find(o => o.Key === 'Title');
            let path = item.Cells.results.find(o => o.Key === 'Path');
            let tipe = item.Cells.results.find(o => o.Key === 'FileExtension');
            let parentFolder = item.Cells.results.find(o => o.Key === 'ParentLink');
            let encodingUrl = item.Cells.results.find(o => o.Key === 'DefaultEncodingURL');
            let temp = encodingUrl.Value.replace('https://dokumen.bi.go.id', '')
            let uri = "https://dokumen.bi.go.id/sites/documentCenter_DGdoc/_api/Web/GetFileByServerRelativePath(decodedurl='" + temp + "')/ListItemAllFields"
            $.ajax({
                // [site]/_api/search/query?querytext='timesheets'

                // https://dokumen.bi.go.id/sites/documentCenter_DGdoc/_api/search/query?querytext='path:https://dokumen.bi.go.id/sites/documentCenter_DGdoc AND title:"+this.searchFolder+" AND IsContainer:true'&rowlimit=50
                url: uri,
                type: "GET",
                context: this,
                headers: { "accept": "application/json;odata=verbose" },
                success: function onSuccess(data) {
                    var temp2 = data.d
                    this.listSearchFileDoclib.push({ name: title.Value, uri: path.Value, metadataSearch: item, tipe: tipe.Value, parentFolder: parentFolder.Value, metadata: data.d })
                }
            });

        },
        advanceSearch: async function () {
            if (!!this.searchField.trim()) {
                this.isGlobalSearch = true
                this.isNavigating = false
                this.isIframe = false
                this.searchUnknown = this.searchField
                this.pages = []
                this.page = 1
                var condition = ''
                var isMetadata = ''
                var uri = ''
                var isContent = ''
                this.listCheckbox
                this.yangDimunculin = []
                var searchInput = this.searchField
                while (searchInput.includes("'")) {
                    searchInput = searchInput.replace("'", "")
                }
                var index
                index = this.checkboxAdvanceSearch.indexOf('isFolder');
                if (index > -1) {
                    condition = "AND IsContainer:true"
                }
                index = this.checkboxAdvanceSearch.indexOf('isFile');
                if (index > -1) {
                    if (condition != '') {
                        condition = ''
                    } else
                        condition = 'AND IsContainer:false'
                }
                index = this.checkboxAdvanceSearch.indexOf('isMetadata');
                if (index > -1) {
                    isMetadata = " OR Keywordfile:" + searchInput + " OR Event:" + searchInput + " OR PS:" + searchInput + " OR satkerPembuat:" + searchInput + " OR namaTopik:" + searchInput
                }
                index = this.checkboxAdvanceSearch.indexOf('isContent');
                if (index > -1) {
                    isContent = " OR content:" + searchInput
                }
                if (isMetadata == '' && isContent == '') {
                    // isMetadata = " OR Keywordfile:" + searchInput + " OR Event:" + searchInput + " OR PS:" + searchInput + " OR satkerPembuat:" + searchInput + " OR namaTopik:" + searchInput
                    // isContent = " OR content:" + searchInput
                }

                // var searchInput = this.searchField.replace(' ','*')
                // searchInput = "*"+searchInput+"*"
                this.resultAdvanceSearch = []
                this.onAdvanceSearch = true
                this.isSearchLoading = true
                this.resultbyTitle = []
                this.resultbyDescription = []
                this.resultbyRelevance = []
                this.resultbyFolder = []
                var server = _spPageContextInfo;
                const myArr = server.webAbsoluteUrl.split("/", 3);
                let site = myArr[0] + '/' + myArr[1] + '/' + myArr[2]
                // const uri = "https://dokumen.bi.go.id/sites/Workspace_Dev/_api/search/query?querytext='(path:https://dokumen.bi.go.id/sites/mysite/personal OR path:https://dokumen.bi.go.id/sites/documentCenter_DGdoc) AND (title:" + searchInput + " OR Keyword :"+ searchInput +" OR Event :"+ searchInput +" OR PS :"+ searchInput +" OR satkerPembuat :"+ searchInput +" OR namaTopik :"+ searchInput +") "+condition+" '&rowlimit=70&sortlist='Rank%3adescending'" //modified
                if (searchInput.includes(":") || searchInput.includes("*")) {
                    uri = "https://dokumen.bi.go.id/sites/Workspace_Dev/_api/search/query?querytext='(path:https://dokumen.bi.go.id/sites/documentCenter_DGdoc) AND (" + searchInput + " " + isMetadata + " " + isContent + ") " + condition + " '&rowlimit=1070&sortlist='Rank%3adescending'"
                    //  uri = "https://dokumen.bi.go.id/sites/Workspace_Dev/_api/search/query?querytext='(path:https://dokumen.bi.go.id/sites/documentCenter_DGdoc OR path:https://dokumen.bi.go.id/sites/documentCenter_gbioffc OR path:https://dokumen.bi.go.id/sites/documentCenter_dgsoffc OR https://dokumen.bi.go.id/sites/documentCenter_adg3offc OR https://dokumen.bi.go.id/sites/documentCenter_adg4offc OR https://dokumen.bi.go.id/sites/documentCenter_adg5offc OR https://dokumen.bi.go.id/sites/documentCenter_adg6offc) AND (" + searchInput + " "+isMetadata+" "+isContent +") " + condition + " '&rowlimit=70&sortlist='Rank%3adescending'"
                } else {
                    uri = "https://dokumen.bi.go.id/sites/Workspace_Dev/_api/search/query?querytext='(path:https://dokumen.bi.go.id/sites/documentCenter_DGdoc) AND (title:" + searchInput + " " + isMetadata + " " + isContent + ") " + condition + " '&rowlimit=1070&sortlist='Rank%3adescending'" //kita
                    //  uri = "https://dokumen.bi.go.id/sites/Workspace_Dev/_api/search/query?querytext='(path:https://dokumen.bi.go.id/sites/documentCenter_DGdoc OR path:https://dokumen.bi.go.id/sites/documentCenter_gbioffc OR path:https://dokumen.bi.go.id/sites/documentCenter_dgsoffc OR https://dokumen.bi.go.id/sites/documentCenter_adg3offc OR https://dokumen.bi.go.id/sites/documentCenter_adg4offc OR https://dokumen.bi.go.id/sites/documentCenter_adg5offc OR https://dokumen.bi.go.id/sites/documentCenter_adg6offc) AND (title:" + searchInput + " "+isMetadata+" "+isContent +") " + condition + " '&rowlimit=70&sortlist='Rank%3adescending'" //kita
                }
                // const uri = "https://dokumen.bi.go.id/sites/Workspace_Dev/_api/search/query?querytext='(path:https://dokumen.bi.go.id/sites/mysite/personal OR path:https://dokumen.bi.go.id/sites/documentCenter_DGdoc) AND ( content :"+ searchInput +" OR Keyword :"+ searchInput +" OR Event :"+ searchInput +" OR PS :"+ searchInput +" OR satkerPembuat :"+ searchInput +" OR namaTopik :"+ searchInput +" OR title:" + searchInput + " ) "+condition+" '&rowlimit=70&sortlist='Rank%3adescending'" //dmst
                console.log(uri)
                $.ajax({
                    // [site]/_api/search/query?querytext='timesheets'
                    // (path:https://dokumen.bi.go.id/sites/mysite/personal/yulianto_an_i OR  path:https://dokumen.bi.go.id/sites/documentCenter_DGdoc) AND title : absensi
                    url: uri,
                    type: "GET",
                    context: this,
                    headers: { "accept": "application/json;odata=verbose" },
                    success: function onSuccess(data) {
                        var asli = []
                        var loop = 0
                        this.rowHasilSearchRelevan = data.d.query.PrimaryQueryResult.RelevantResults.TotalRows
                        this.responseSearch = data.d.query.PrimaryQueryResult.RelevantResults.Table.Rows.results
                        for (i in this.responseSearch) {

                            let rank = this.responseSearch[i].Cells.results.find(o => o.Key === 'Rank');
                            let title = this.responseSearch[i].Cells.results.find(o => o.Key === 'Title');
                            if (title.Value.toLowerCase().includes('.aspx') || title.Value.toLowerCase().includes('hari pertama') || title.Value.toLowerCase().includes('hari kedua')) {
                                continue
                            }
                            // Start Brute Force Kevin
                            if (title.Value.toLowerCase().includes('tayangan_')) {
                                title.Value = title.Value.slice(title.Value.indexOf('_') + 1);
                            }
                            //End Brute Force Kevin
                            let fileType = this.responseSearch[i].Cells.results.find(o => o.Key === 'FileType');
                            if (fileType == null) {
                                continue
                            }
                            let description = this.responseSearch[i].Cells.results.find(o => o.Key === 'Description');
                            var isFile = this.responseSearch[i].Cells.results.find(o => o.Key === 'IsDocument');
                            var isFolder = this.responseSearch[i].Cells.results.find(o => o.Key === 'IsContainer');
                            if (isFile.Value == 'false' && isFolder.Value == 'false') {
                                continue
                            }
                            let path = this.responseSearch[i].Cells.results.find(o => o.Key === 'Path');
                            //handling metadata yang kosong
                            if (description.Value == null) {
                                description.Value = ''
                            }
                            var x = path.Value.split("/");
                            let pathFolder = x.slice(0, x.length - 1).join("/") + "/";
                            var temp = path.Value
                            temp = temp.replace(site, '');
                            temp = temp.replace(' ', '%20')
                            pathFolder = pathFolder.replace(' ', '%20')
                            asli.push({ name: title.Value, path: path.Value, filesUri: server.webAbsoluteUrl + "/_api/Web/GetFolderByServerRelativePath(decodedurl='" + temp + "')/Files", isFolder: isFolder.Value, isFile: isFile.Value, fileType: fileType.Value, description: description.Value, pathFolder: pathFolder, rank: rank.Value })
                            if (isFolder.Value == 'true') {
                                this.resultbyFolder.push({ name: title.Value, path: path.Value, filesUri: server.webAbsoluteUrl + "/_api/Web/GetFolderByServerRelativePath(decodedurl='" + temp + "')/Files", isFolder: isFolder.Value, isFile: isFile.Value, fileType: fileType.Value, description: description.Value, pathFolder: pathFolder })
                            } else if (title.Value.toLowerCase().includes(this.searchField)) {
                                this.resultbyTitle.push({ name: title.Value, path: path.Value, filesUri: server.webAbsoluteUrl + "/_api/Web/GetFolderByServerRelativePath(decodedurl='" + temp + "')/Files", isFolder: isFolder.Value, isFile: isFile.Value, fileType: fileType.Value, description: description.Value, pathFolder: pathFolder })
                            } else if (description.Value.toLowerCase().includes(this.searchField)) {
                                this.resultbyDescription.push({ name: title.Value, path: path.Value, filesUri: server.webAbsoluteUrl + "/_api/Web/GetFolderByServerRelativePath(decodedurl='" + temp + "')/Files", isFolder: isFolder.Value, isFile: isFile.Value, fileType: fileType.Value, description: description.Value, pathFolder: pathFolder })
                            } else {
                                this.resultbyRelevance.push({ name: title.Value, path: path.Value, filesUri: server.webAbsoluteUrl + "/_api/Web/GetFolderByServerRelativePath(decodedurl='" + temp + "')/Files", isFolder: isFolder.Value, isFile: isFile.Value, fileType: fileType.Value, description: description.Value, pathFolder: pathFolder })
                            }

                        }
                        if (this.resultbyFolder != undefined) {
                            this.resultAdvanceSearch = this.resultAdvanceSearch.concat(this.resultbyFolder)
                        }
                        if (this.resultbyTitle != undefined) {
                            this.resultAdvanceSearch = this.resultAdvanceSearch.concat(this.resultbyTitle)
                        }
                        if (this.restultbyDescription != undefined) {
                            this.resultAdvanceSearch = this.resultAdvanceSearch.concat(this.restultbyDescription)
                        }
                        if (this.resultbyRelevance != undefined) {
                            this.resultAdvanceSearch = this.resultAdvanceSearch.concat(this.resultbyRelevance)
                        }
                        console.log(asli)
                        this.rowHasilSearch = asli.length
                        // console.log(data.d.query.PrimaryQueryResult.RelevantResults.Table.Rows.results)
                        this.yangDimunculin = asli
                        this.isSearchLoading = false
                    }
                });
            } else
                alert('search field kosong')


        },
        setPages() {
            let numberOfPages = Math.ceil(this.resultAdvanceSearch.length / this.perPage);
            console.log(numberOfPages)
            for (let index = 1; index <= numberOfPages; index++) {
                this.pages.push(index);
            }
        },
        paginate(posts) {
            let page = this.page;
            let perPage = this.perPage;
            let from = page * perPage - perPage;
            let to = page * perPage;
            let temp = posts.slice(from, to)
            return temp;
        },
        workAroundDetailMetadata: async function (item) {
            this.listMetadata = item
            var listFix = []
            var listLagi = []
            var temp = ''
            var listTemp = []
            var listTemp3 = []
            listTemp = item
            for (i in this.listMetadataSistem) {
                delete listTemp[this.listMetadataSistem[i]];
            }
            if (item.AuthorId) {
                await this.getUserbyId(item, item.AuthorId, 'Creator')
                await this.getUserbyId(item, item.EditorId, 'Modified By')
                await this.getUserbyId(item, item.PresenterId, 'Presenter')
                for (i in this.listMetadataRefecth) {
                    delete listTemp[this.listMetadataRefecth[i]];
                }
                for (i in this.listMetadataRename) {
                    await this.renameObject(listTemp, this.listMetadataRename[i][0], this.listMetadataRename[i][1])
                }
                listTemp = await getList(listTemp, this.listMetadataList, this.listEvent, this.listPs, this.listSatker, this.listDokumen)
                await this.timeout(500)
                await this.renameObject(listTemp, 'EventId', 'Event')
                await this.renameObject(listTemp, 'tipeDokumenId', 'Jenis Dokumen')
                await this.renameObject(listTemp, 'PSId', 'Program Strategis')
                await this.renameObject(listTemp, 'satkerPembuatId', 'Satker Pembuat')

                for (i in this.listMetadataRename) {
                    delete listTemp[this.listMetadataRename[i]];
                }

                listLagi = await sortObject(listFix, listTemp, this.listMetadataTampil)

                this.listMetadata = listLagi

            } else {
                listLagi = await sortObject(listFix, listTemp, this.listMetadataTampil)

                this.listMetadata = listLagi
            }

            async function sortObject(source, result, loop) {
                var temp
                for (i in loop) {
                    temp = loop[i]
                    listFix.push({ [temp]: listTemp[loop[i]] })
                }
                return listFix
            }
            async function getList(listTemp, listMetadataList, listEvent, listPs, listSatker, listDokumen) {
                temp = listEvent[listTemp[listMetadataList[0]] - 1]
                listTemp[listMetadataList[0]] = temp.Title
                temp = listPs[listTemp[listMetadataList[1]] - 1]
                listTemp[listMetadataList[1]] = temp.Title
                temp = listSatker[listTemp[listMetadataList[2]] - 1]
                listTemp[listMetadataList[2]] = temp.Title
                temp = listDokumen[listTemp[listMetadataList[3]] - 1]
                listTemp[listMetadataList[3]] = temp.Title
                return listTemp
            }
        },
        assignSelectedFile: function (item) {
            this.fileSelected = item
        },
        detailMetadata: async function (item, tipe) {
            var temp3 = ''
            this.presenter = ''
            this.modifikator = ''
            this.creator = ''
            // await this.workAroundDetailMetadata(item)
            // await this.timeout(5000)
            // await this.workAroundDetailMetadata(item) 
            if (tipe == 'navigation') {
                this.isPresenterLoading = true
                this.isModifikatorLoading = true
                this.isCreatorLoading = true
                this.namaTopik = item.namaTopik

                // this.presenter=item.PresenterId
                if (this.findAllDoclib) {
                    this.presenter = item.Presenter
                    this.isPresenterLoading = false
                    if (item.tipeDokumen != null) {
                        this.jenisDokumen = item.tipeDokumen
                    } else {
                        this.jenisDokumen = 'tidak ada metadata'
                    }
                    if (item.satkerPembuat != null) {
                        this.satkerPembuat = item.satkerPembuat
                    } else {
                        this.satkerPembuat = 'tidak ada metadata'
                    }
                    if (item.PS != null) {
                        this.pS = item.PS
                    } else {
                        this.pS = 'tidak ada metadata'
                    }
                    if (item.Event != null) {
                        this.event = item.Event
                    } else {
                        this.event = 'tidak ada metadata'
                    }
                } else {
                    if (item.tipeDokumenId != null) {
                        temp3 = this.listDokumen.filter(x => x.Id === item.tipeDokumenId)
                        this.jenisDokumen = temp3[0].Title
                    } else {
                        this.jenisDokumen = 'tidak ada metadata'
                    }

                    if (item.satkerPembuatId != null) {
                        temp3 = this.listSatker.filter(x => x.Id === item.satkerPembuatId)
                        this.satkerPembuat = temp3[0].Title
                    } else {
                        this.satkerPembuat = 'tidak ada metadata'
                    }
                    if (item.PSId != null) {
                        temp3 = this.listPs.filter(x => x.Id === item.PSId)
                        this.pS = temp3[0].Title
                    } else {
                        this.pS = 'tidak ada metadata'
                    }
                    if (item.EventId != null) {
                        temp3 = this.listEvent.filter(x => x.Id === item.EventId)
                        this.event = temp3[0].Title
                    } else {
                        this.event = 'tidak ada metadata'
                    }
                    if (item.PresenterId != null) {
                        this.getUserbyId(item.PresenterId, 'presenter')
                    } else {
                        this.presenter = 'tidak ada metadata'
                        this.isPresenterLoading = false;
                    }
                    if (item.EditorId != null) {
                        this.getUserbyId(item.EditorId, 'modifikator')
                    } else {
                        this.modifikator = 'tidak ada metadata'
                        this.isModifikatorLoading = false;
                    }
                    if (item.EditorId != null) {
                        this.getUserbyId(item.AuthorId, 'creator')
                    } else {
                        this.creator = 'tidak ada metadata'
                        this.isCreatorLoading = false;
                    }
                }
                if (this.findAllDoclib) {
                    if (item.modifikator != null) {
                        this.modifikator = item.modifikator
                    } else {
                        this.modifikator = 'tidak ada metadata'
                        this.isModifikatorLoading = false;
                    }
                    if (item.Author != null) {
                        this.creator = item.Author
                    } else {
                        this.creator = 'tidak ada metadata'
                        this.isCreatorLoading = false;
                    }
                }
                if (item.tanggalPelaksanaan != null) {
                    this.tanggalPelaksanaan = item.tanggalPelaksanaan
                } else {
                    this.tanggalPelaksanaan = 'tidak ada metadata'
                }
                if (item.Keyword != null) {
                    this.keyword = item.Keyword
                } else {
                    this.keyword = 'tidak ada metadata'
                }
                if (item.Versi != null) {
                    this.versi = item.Versi
                } else {
                    this.versi = 'tidak ada metadata'
                }
                if (item.Modified != null) {
                    this.modified = item.Modified
                } else {
                    this.modified = 'tidak ada metadata'
                }
                if (item.Created != null) {
                    this.created = item.Created
                } else {
                    this.created = 'tidak ada metadata'
                }
            } if (tipe == 'search') {
                this.namaTopik = item.namaTopik
                this.satkerPembuat = item.satkerPembuat
                this.pS = item.ps
                this.event = item.event
                // this.presenter=item.PresenterId
                if (this.isPersonal) {
                    this.presenter = item.Presenter
                } else {
                    this.presenter = item.presenter
                }
                this.creator = item.author
                this.modifikator = item.modifikator
                this.tanggalPelaksanaan = item.tanggalPelaksanaan
                this.keyword = item.keyword
                this.versi = item.versi
                this.jenisDokumen = item.tipeDokumen
                this.modified = item.modified
                // this.modifikator=item.EditorId
                this.created = item.created
            }
        },
        renameObject: function (objek, dulu, baru) {
            const temp = objek[dulu]
            delete objek[dulu];
            objek[baru] = temp
            return ''
        },
        setPath: function (item) {
            this.linkFolder = item
        },
        getlistbyId: function (listName, id) {
            // /_api/web/lists/GetByTitle('Test')/items({item_id})
        },
        getUserbyId: function (id, source) {
            return new Promise((resolve) => {
                let temp = ''
                $.ajax({
                    url: "https://dokumen.bi.go.id/sites/documentCenter_DGdoc/_api/web/getuserbyid(" + id + ")",
                    type: "GET",
                    context: this,
                    headers: { "accept": "application/json;odata=verbose" },
                    success: function onSuccess(data) {
                        // item.push({[tipe]:data.d.Title})
                        if (source == 'presenter') {
                            this.presenter = data.d.Title
                        }
                        switch (source) {
                            case 'presenter':
                                this.presenter = data.d.Title;
                                this.isPresenterLoading = false;
                                resolve({
                                    data: {
                                        temp,
                                    },
                                });
                                break;
                            case 'modifikator':
                                this.modifikator = data.d.Title;
                                this.isModifikatorLoading = false;
                                resolve({
                                    data: {
                                        temp,
                                    },
                                });
                                break;
                            case 'creator':
                                this.creator = data.d.Title;
                                this.isCreatorLoading = false;
                                resolve({
                                    data: {
                                        temp,
                                    },
                                });
                                break;
                            case 'return':
                                var x = data.d.Title;
                                resolve({
                                    data: {
                                        x,
                                    },
                                });
                                break;
                        }
                    }
                });
            }
            )
        },
        getAllList: function (listName) {
            let x = _spPageContextInfo.webAbsoluteUrl
            $.ajax({
                url: "https://dokumen.bi.go.id/sites/documentCenter_DGdoc/_api/web/lists/GetByTitle('" + listName + "')/items",
                type: "GET",
                context: this,
                headers: { "accept": "application/json;odata=verbose" },
                success: function onSuccess(data) {
                    return data.d
                }
            });
        },
        openModalCopyFile: async function (parent, item) {
            this.isCopyModalChoosed = true
            this.isDownloadModalClicked = false
            this.isRequestModalClicked = false
            console.log('parentt')
            console.log(this.listPersonal)
            if (item == "") {
                this.coppiedFile = this.listDownload
                this.coppiedFileShow = this.listDownload
            } else if (item == "drag") {
                this.coppiedFile = []
                this.coppiedFileShow = []
                this.coppiedFile.push(this.listTemp)
                this.coppiedFileShow.push(this.listTemp)
                this.listTemp = []
            }
            else {
                this.coppiedFile = item
            }

            this.parentActive = parent.Name
            this.parentActiveUri = parent.ServerRelativeUrl
            let modalCopy = document.getElementById("universalModal");
            modalCopy.style.display = "block";
            this.isParentClicked = false;
            this.isFolderLoading = false;
            this.isclickedPersonal = true;
        },
        copyMutipleFileToPersonal: async function () {

            if (this.coppiedFile.length > 0) {
                var nama = this.personalUrl
                var domain = this.domain
                var fail = []
                var sourceSites = ''
                var personalLib = ''
                let listSatker = this.listSatker
                let listPs = this.listPs
                let listEvent = this.listEvent
                let listDokumen = this.listDokumen
                let folderTujuan = this.linkFolderPersonal.replace('https://dokumen.bi.go.id', '')
                this.progressMultipleCopy = 0.0
                var progress = 0.0
                var destinationSites = ''
                if (this.linkFolder.includes('personal')) {
                    sourceSites = this.linkFolder.split('/').splice(0, 7).join('/')
                } else {
                    sourceSites = this.linkFolder.split('/').splice(0, 5).join('/')
                }
                if (this.linkFolderPersonal.includes('personal')) {
                    destinationSites = this.linkFolderPersonal.split('/').splice(0, 7).join('/')
                    personalLib = this.linkFolderPersonal.split('/')
                    personalLib = personalLib[7]
                } else {
                    destinationSites = this.linkFolderPersonal.split('/').splice(0, 5).join('/')
                    personalLib = this.linkFolderPersonal.split('/')
                    personalLib = personalLib[5]
                }
                NProgress.start()
                var x = this.coppiedFile.length

                i = 0
                let promises = [];
                let result = [];
                let y

                let currentPage = 1;

                while (currentPage <= x) {
                    y = this.coppiedFile[currentPage - 1]
                    if (y[3].PresenterId) {
                        promises.push(this.getUserbyId(y[3].PresenterId, 'return'));
                    } else {
                        let x = y[3].Presenter
                        promises.push({ data: { x, }, })
                    }
                    currentPage++;
                }
                const presenter = await Promise.all(promises);

                promises = [];
                currentPage = 1;
                while (currentPage <= x) {
                    promises.push(copyFileMutiple(this.coppiedFile[currentPage - 1], x, presenter[currentPage - 1].data.x));
                    currentPage++;
                }

                const data = await Promise.all(promises);
                data.forEach(({ data }) => {
                    result = [...result, data];
                });
                NProgress.done(true)
                for (i in result) {
                    if (result[i].status == false) {
                        fail.push(result[i].fileName)
                    }
                }
                if (fail.length > 0) {
                    alert('copy mutiple file sukses, namun metadata file :' + fail.join(', ') + ' tidak terbawa')
                } else {
                    alert('copy multiple file sukses')
                }
                async function copyFileMutiple(item, count, presenterIni) {
                    var item = item
                    var count = count

                    // var presenter = await this.getUserbyId(item[3].PresenterId, 'return')
                    if (item[3].satkerPembuatId) {
                        var satker = listSatker[item[3].satkerPembuatId - 1].Title
                        var PS = listPs[item[3].PSId - 1].Title
                        var Event = listEvent[item[3].EventId - 1].Title
                        var tipeDokumen = listDokumen[item[3].tipeDokumenId - 1].Title
                    } else {
                        var satker = item[3].satkerPembuat
                        var PS = item[3].PS
                        var Event = item[3].Event
                        var tipeDokumen = item[3].tipeDokumen
                    }
                    var presenterAcara = presenterIni

                    return new Promise((resolve) => {
                        var hostweburl = "https://dokumen.bi.go.id";//edit

                        initListName()
                        function initListName() {
                            var scriptbase = hostweburl + "/_layouts/15/";
                            $.getScript(scriptbase + "/SP.RequestExecutor.js", copyFile);
                        }

                        function copyFile() {

                            var sourceUrl = sourceSites;//provide source site url
                            var destUrl = destinationSites;//provide destination site url 
                            // Create a request executor.
                            var sourceExecutor = new SP.RequestExecutor(sourceUrl);
                            var targetExecutor = new SP.RequestExecutor(destUrl);
                            var fileName = item[0].replace(domain, "");
                            //provide file name with path 
                            var fileContentUrl = sourceUrl + "/_api/web/GetFileByServerRelativeUrl('" + fileName + "')/$value";

                            var targetSiteUrl = destUrl;

                            //var folderName='ProjectAttachments';

                            var newFileName = item[1];//New name of added file
                            var folderName = folderTujuan
                            //provide folder path to which file to be copied
                            var restUrl = targetSiteUrl + "/_api/web/GetFolderByServerRelativeUrl('" + folderName + "')/Files/Add(url='" + newFileName + "',overwrite=true)";
                            $.ajax({
                                url: targetSiteUrl + "/_api/contextinfo",
                                type: "POST",
                                headers: {
                                    "Accept": "application/json;odata=verbose"
                                },
                                success: function (data) {
                                    var digest = data.d.GetContextWebInformation.FormDigestValue;
                                    //  NProgress.set(0.2)
                                    // Build executor action to retrieve the file data.
                                    var getFileAction = {
                                        url: fileContentUrl,
                                        method: "GET",
                                        binaryStringResponseBody: true,
                                        success: function (getFileData) {
                                            // NProgress.set(0.5)
                                            // Get the binary data.
                                            NProgress.inc((1 / count) / 2)
                                            var result = data.body;
                                            // Build executor action to copy the file data to the new location.
                                            var copyFileAction = {
                                                url: restUrl,
                                                method: "POST",
                                                headers: {
                                                    "Accept": "application/json; odata=verbose",
                                                    "X-RequestDigest": digest
                                                },
                                                contentType: "application/json;odata=verbose",
                                                binaryStringRequestBody: true,
                                                body: getFileData.body,
                                                success: function (copyFileData) {
                                                    NProgress.inc((1 / count) / 2)
                                                    $.ajax({
                                                        url: targetSiteUrl + "/_api/web/lists/getbytitle('" + personalLib + "')/items?$filter=FileLeafRef eq '" + item[1] + "'&$select=Id",
                                                        type: "GET",
                                                        context: this,
                                                        headers: { "accept": "application/json;odata=verbose" },
                                                        success: async function onSuccess(data) {
                                                            var id = 0
                                                            var typeMetadata = ''
                                                            for (i in data.d.results) {
                                                                if (id <= data.d.results[i].Id) {
                                                                    id = data.d.results[i].Id
                                                                    typeMetadata = data.d.results[i].__metadata.type
                                                                }
                                                            }
                                                            var idNew = id
                                                            $.ajax({
                                                                url: targetSiteUrl + "/_api/web/lists/getbytitle('" + personalLib + "')/items(" + idNew + ")",
                                                                type: "POST",
                                                                data: JSON.stringify({
                                                                    "__metadata":
                                                                    {
                                                                        type: typeMetadata
                                                                    },
                                                                    "namaTopik": item[3].namaTopik,
                                                                    "satkerPembuat": satker,
                                                                    "PS": PS,
                                                                    "Event": Event,
                                                                    "tanggalPelaksanaan": item[3].tanggalPelaksanaan,
                                                                    "tipeDokumen": tipeDokumen,
                                                                    "Versi": item[3].Versi,
                                                                    "Presenter": presenterAcara,
                                                                    "Keyword": item[3].Keyword
                                                                }),
                                                                headers:
                                                                {
                                                                    "Accept": "application/json;odata=verbose",
                                                                    "Content-Type": "application/json;odata=verbose",
                                                                    "X-RequestDigest": digest,
                                                                    "IF-MATCH": "*",
                                                                    "X-HTTP-Method": "MERGE"
                                                                },
                                                                success: function (data, status, xhr) {

                                                                    resolve({
                                                                        data: {
                                                                            fileName: newFileName, status: true
                                                                        },
                                                                    });
                                                                },
                                                                error: function (xhr, status, error) {
                                                                    console.log(error);
                                                                    resolve({
                                                                        data: {
                                                                            fileName: newFileName, status: false
                                                                        },
                                                                    });
                                                                }
                                                            });
                                                            // }
                                                            // });
                                                        }
                                                    });
                                                },
                                                error: function (ex) {
                                                    alert("Something went wrong, please try again later");
                                                    NProgress.done(true)
                                                    //show your 'failed' message
                                                }
                                            };
                                            targetExecutor.executeAsync(copyFileAction);
                                        },
                                        error: function (ex) {
                                            //fail
                                            alert("Something went wrong, please try again later");
                                            NProgress.done(true)
                                        }
                                    };
                                    sourceExecutor.executeAsync(getFileAction);
                                },
                                error: function (ex) {
                                    //fail
                                    alert("Something went wrong, please try again later");
                                    NProgress.done(true)
                                }
                            });
                        }

                    })
                }
            }
        },
        copyFileToPersonal: async function () {
            if (Array.isArray(this.coppiedFile)) {
                this.copyMutipleFileToPersonal()
            } else {

                NProgress.start()
                if (this.linkFolderPersonal) {
                    var presenter = ''
                    item = this.coppiedFile
                    console.log('item')
                    console.log(item)
                    var satker = ''
                    var PS = ''
                    var Event = ''
                    var tipeDokumen = ''
                    var sourceSites = ''
                    var personalLib = ''
                    var destinationSites = ''
                    var hostweburl = "https://dokumen.bi.go.id";//edit
                    var nama = this.personalUrl
                    var domain = this.domain
                    if (item.metadata.PresenterId) {
                        console.log('trigger2')
                        // presenter = await this.getUserbyId(item.metadata.PresenterId, 'return')
                        presenter = item.metadata.PresenterId
                        satker = item.metadata.satkerPembuatId
                        PS = item.metadata.PSId
                        Event = item.metadata.EventId
                        tipeDokumen = item.metadata.tipeDokumenId
                    } else {
                        console.log('trigger')
                        presenter = item.metadata.Presenter
                        satker = item.metadata.satkerPembuat
                        PS = item.metadata.PS
                        Event = item.metadata.Event
                        tipeDokumen = item.metadata.tipeDokumen
                    }

                    var folderTujuan = this.linkFolderPersonal.replace('https://dokumen.bi.go.id', '')
                    if (this.linkFolder.includes('personal')) {
                        sourceSites = this.linkFolder.split('/').splice(0, 7).join('/')
                    } else {
                        sourceSites = this.linkFolder.split('/').splice(0, 5).join('/')
                    }
                    if (this.linkFolderPersonal.includes('personal')) {
                        destinationSites = this.linkFolderPersonal.split('/').splice(0, 7).join('/')
                        personalLib = this.linkFolderPersonal.split('/')
                        personalLib = personalLib[7]
                    } else {
                        destinationSites = this.linkFolderPersonal.split('/').splice(0, 5).join('/')
                        personalLib = this.linkFolderPersonal.split('/')
                        personalLib = personalLib[5]
                    }
                    console.log(satker)
                    initListName()


                    function initListName() {
                        var scriptbase = hostweburl + "/_layouts/15/";
                        $.getScript(scriptbase + "/SP.RequestExecutor.js", copyFile);
                    }

                    function copyFile() {

                        var sourceUrl = sourceSites;//provide source site url
                        var destUrl = destinationSites;//provide destination site url 
                        // Create a request executor.
                        var sourceExecutor = new SP.RequestExecutor(sourceUrl);
                        var targetExecutor = new SP.RequestExecutor(destUrl);
                        var fileName = item.uri.replace(domain, "");
                        //provide file name with path 
                        var fileContentUrl = sourceUrl + "/_api/web/GetFileByServerRelativeUrl('" + fileName + "')/$value";

                        var targetSiteUrl = destUrl;

                        //var folderName='ProjectAttachments';

                        var newFileName = item.name;//New name of added file
                        var folderName = folderTujuan
                        //provide folder path to which file to be copied
                        var restUrl = targetSiteUrl + "/_api/web/GetFolderByServerRelativeUrl('" + folderName + "')/Files/Add(url='" + newFileName + "',overwrite=true)";
                        $.ajax({
                            url: targetSiteUrl + "/_api/contextinfo",
                            type: "POST",
                            headers: {
                                "Accept": "application/json;odata=verbose"
                            },
                            success: function (data) {
                                var digest = data.d.GetContextWebInformation.FormDigestValue;
                                NProgress.set(0.2)
                                // Build executor action to retrieve the file data.
                                var getFileAction = {
                                    url: fileContentUrl,
                                    method: "GET",
                                    binaryStringResponseBody: true,
                                    success: function (getFileData) {
                                        NProgress.set(0.5)
                                        // Get the binary data.
                                        var result = data.body;
                                        // Build executor action to copy the file data to the new location.
                                        var copyFileAction = {
                                            url: restUrl,
                                            method: "POST",
                                            headers: {
                                                "Accept": "application/json; odata=verbose",
                                                "X-RequestDigest": digest
                                            },
                                            contentType: "application/json;odata=verbose",
                                            binaryStringRequestBody: true,
                                            body: getFileData.body,
                                            success: function (copyFileData) {

                                                NProgress.set(0.9)
                                                // alert("successfully Copied");
                                                // this.updateMetadata(item.name)
                                                $.ajax({
                                                    url: targetSiteUrl + "/_api/web/lists/getbytitle('" + personalLib + "')/items?$filter=FileLeafRef eq '" + item.name + "'",
                                                    type: "GET",
                                                    context: this,
                                                    headers: { "accept": "application/json;odata=verbose" },
                                                    success: async function onSuccess(data) {
                                                        console.log('id item')
                                                        console.log(data)
                                                        var id = 0
                                                        var typeMetadata = ''
                                                        for (i in data.d.results) {
                                                            if (id <= data.d.results[i].Id) {
                                                                id = data.d.results[i].Id
                                                                typeMetadata = data.d.results[i].__metadata.type
                                                            }
                                                        }
                                                        var idNew = id
                                                        $.ajax({
                                                            url: targetSiteUrl + "/_api/web/lists/getbytitle('" + personalLib + "')/items(" + idNew + ")",
                                                            type: "POST",
                                                            data: JSON.stringify({
                                                                "__metadata":
                                                                {
                                                                    type: typeMetadata
                                                                },
                                                                "namaTopik": item.metadata.namaTopik,
                                                                "satkerPembuatId": satker,
                                                                "PSId": PS,
                                                                "EventId": Event,
                                                                "tanggalPelaksanaan": item.metadata.tanggalPelaksanaan,
                                                                "tipeDokumenId": tipeDokumen,
                                                                "Versi": item.metadata.Versi,
                                                                // "PresenterId": presenter,
                                                                "Keyword": item.metadata.Keyword
                                                            }),
                                                            headers:
                                                            {
                                                                "Accept": "application/json;odata=verbose",
                                                                "Content-Type": "application/json;odata=verbose",
                                                                "X-RequestDigest": digest,
                                                                "IF-MATCH": "*",
                                                                "X-HTTP-Method": "MERGE"
                                                            },
                                                            success: function (data, status, xhr) {
                                                                console.log(xhr);
                                                                console.log(data);
                                                                console.log(status);
                                                                NProgress.done(true)
                                                                alert('berhasil copy file')
                                                            },
                                                            error: function (xhr, status, error) {
                                                                console.log(error);
                                                                alert('berhasil copy file, namun metadata tidak tercopy')
                                                                NProgress.done(true)
                                                            }
                                                        });
                                                        // }
                                                        // });
                                                    },
                                                    error: function (ex) {
                                                        alert("Something went wrong, please try again later 4");
                                                        NProgress.done(true)
                                                        //show your 'failed' message
                                                    }
                                                });
                                            },
                                            error: function (ex) {
                                                alert("Something went wrong, please try again later 3");
                                                NProgress.done(true)
                                                //show your 'failed' message
                                            }
                                        };
                                        targetExecutor.executeAsync(copyFileAction);
                                    },
                                    error: function (ex) {
                                        //fail
                                        alert("Something went wrong, please try again later 2");
                                        NProgress.done(true)
                                    }
                                };
                                sourceExecutor.executeAsync(getFileAction);
                            },
                            error: function (ex) {
                                //fail
                                alert("Something went wrong, please try again later 1");
                                NProgress.done(true)
                            }
                        });
                    }
                } else {
                    alert('pilih folder tujuan')
                }
            }

        },
        showAll: async function () {
            const x = await this.timeout(1500)
            this.tampil = true
        },
        timeout: function (ms) { //pass a time in milliseconds to this function
            return new Promise(resolve => setTimeout(resolve, ms));
        },
        addFolderClicked: function () {
            if (this.linkFolder.length > 0) {
                this.isCreateFolder = true
                this.isDeleteFolder = false
                this.isRenameFolder = false
                this.isFileRename = false
                this.isFileDelete = false
            } else {
                alert('silahkan pilih folder terlebih dahulu')
            }
        },
        deleteFolderClicked: function () {
            if (this.linkFolder.length > 0) {
                var y = "https://dokumen.bi.go.id/sites/mysite/personal/" + this.personalUrl + "/"
                var uriParent = (this.parentActiveUri.substring(0, this.parentActiveUri.lastIndexOf("/") + 1));
                y = this.linkFolder.replace(y, "")
                y = y.replace("https://dokumen.bi.go.id" + uriParent, "")
                this.folderDeleted = "~/" + y
                this.isDeleteFolder = true
                this.isCreateFolder = false
                this.isRenameFolder = false
                this.isFileRename = false
                this.isFileDelete = false
            } else {
                alert('silahkan pilih folder terlebih dahulu')
            }

        },
        renameFolderClicked: function () {
            if (this.linkFolder.length > 0) {
                var y = "https://dokumen.bi.go.id/sites/mysite/personal/" + this.personalUrl + "/"
                var uriParent = (this.parentActiveUri.substring(0, this.parentActiveUri.lastIndexOf("/") + 1));
                y = this.linkFolder.replace(y, "")
                y = y.replace("https://dokumen.bi.go.id" + uriParent, "")
                this.folderDeleted = "~/" + y
                this.isDeleteFolder = false
                this.isCreateFolder = false
                this.isRenameFolder = true
                this.isFileRename = false
                this.isFileDelete = false
            } else {
                alert('silahkan pilih folder terlebih dahulu')
            }
        },
        renameFileClicked: function () {
            if (!_.isEmpty(this.fileSelected)) {
                this.folderDeleted = this.fileSelected.name
                this.isFileRename = true
                this.isFileDelete = false
                this.isDeleteFolder = false
                this.isCreateFolder = false
                this.isRenameFolder = false
            } else {
                alert('silahkan pilih file terlebih dahulu')
            }
        },
        deleteFileClicked: function () {
            if (!_.isEmpty(this.fileSelected)) {
                this.folderDeleted = this.fileSelected.name
                this.isFileRename = false
                this.isFileDelete = true
                this.isDeleteFolder = false
                this.isCreateFolder = false
                this.isRenameFolder = false
            } else {
                alert('silahkan pilih file terlebih dahulu')
            }
        },
        renameFile: function () {
            var uriParent = this.parentActiveUri
            var uriTujuan = (uriParent.substring(uriParent.lastIndexOf("/") + 1));
            uriParent = (uriParent.substring(0, uriParent.lastIndexOf("/") + 1));
            var id = this.fileSelected.metadata.Id
            var input = this.createFolderInput
            var nama = this.personalUrl
            var file = this.fileSelected
            NProgress.start()
            this.createFolderInput = ''
            // rename Folder
            $.ajax({
                url: uriParent + "/_api/contextinfo",
                type: "POST",
                headers: {
                    "Accept": "application/json;odata=verbose"
                },
                success: function (data) {
                    var digest = data.d.GetContextWebInformation.FormDigestValue;
                    var web = uriParent + "/"
                    NProgress.set(0.3)

                    renameFolder(web, uriTujuan, id, input, digest, file)
                        .done(function () {
                            alert('File has been renamed');
                            NProgress.done(true)
                        })
                        .fail(
                            function (error) {

                                alert(error.responseJSON.error.message.value)

                                NProgress.done(true)
                            });
                }
            })
            function executeJson(url, method, additionalHeaders, payload, digest) {
                var headers = {};
                headers["Accept"] = "application/json;odata=verbose";
                if (method == "POST") {
                    headers["X-RequestDigest"] = digest;
                }
                if (typeof additionalHeaders != 'undefined') {
                    for (var key in additionalHeaders) {
                        headers[key] = additionalHeaders[key];
                    }
                }

                var ajaxOptions =
                {
                    url: url,
                    type: method,
                    contentType: "application/json;odata=verbose",
                    headers: headers
                };
                if (method == "POST") {
                    ajaxOptions.data = JSON.stringify(payload);
                }
                NProgress.set(0.7)
                return $.ajax(ajaxOptions);
            }

            function renameFolder(webUrl, listTitle, itemId, name, digest, file) {
                var itemUrl = webUrl + "/_api/Web/Lists/GetByTitle('" + listTitle + "')/Items(" + itemId + ")";
                var itemPayload = {};
                itemPayload['__metadata'] = { 'type': file.metadata.__metadata.type };
                itemPayload['Title'] = name;
                itemPayload['FileLeafRef'] = name;
                var additionalHeaders = {};
                additionalHeaders["X-HTTP-Method"] = "MERGE";
                additionalHeaders["If-Match"] = "*";

                NProgress.set(0.5)
                return executeJson(itemUrl, "POST", additionalHeaders, itemPayload, digest);
            }


            function getItemTypeForListName(name) {
                NProgress.set(0.4)
                return "SP.Data.GBI_x0020_OfficeItem";
            }
        },
        deleteFile: function () {
            var pathFolder = this.linkFolder.replace("https://dokumen.bi.go.id", "")
            var path = this.fileSelected.uri.replace("https://dokumen.bi.go.id", "")
            var uriParent = this.parentActiveUri
            uriParent = (uriParent.substring(0, uriParent.lastIndexOf("/") + 1));
            var nama = this.personalUrl
            $.ajax({
                url: uriParent + "/_api/contextinfo",
                type: "POST",
                headers: {
                    "Accept": "application/json;odata=verbose"
                },
                success: function (data) {
                    var digest = data.d.GetContextWebInformation.FormDigestValue;
                    var web = uriParent + "/"
                    $.ajax(
                        {
                            url: uriParent + "/_api/web/getfilebyserverrelativeurl('" + path + "')",
                            method: "POST",
                            headers: {
                                "accept": "application/json;odata=verbose",
                                "content-type": "application/json;odata=verbose",
                                "X-HTTP-Method": "DELETE",
                                "If-Match": "*",
                                "X-RequestDigest": digest
                            },
                            success: function (data) {
                                console.log(data)
                                alert('hapus file sukses')
                                NProgress.done(true)
                            },
                            error: function (data) {
                                console.log(data)
                                alert(data.message.value)
                                NProgress.done(true)
                            }
                        });
                }
            })
        },
        createFolder() {
            if (this.isPersonal) {
                var uriParent = this.parentActiveUri
                uriParent = (uriParent.substring(0, uriParent.lastIndexOf("/") + 1));
                NProgress.start()
                // create folder
                var y = ""
                y = this.linkFolder.replace("https://dokumen.bi.go.id" + uriParent, "")
                let folderBaru = this.createFolderInput
                //get form digest tujuan
                NProgress.set(0.4)
                $.ajax({
                    url: uriParent + "/_api/contextinfo",
                    type: "POST",
                    context: this,
                    headers: { "accept": "application/json;odata=verbose" },
                    success: function onSuccess(data) {
                        NProgress.set(0.9)
                        var digest = data.d.GetContextWebInformation.FormDigestValue
                        $.ajax({
                            url: uriParent + "/_api/Web/Folders/add('" + y + "/" + folderBaru + "')",
                            type: "POST",
                            context: this,
                            headers: {
                                "accept": "application/json; odata=verbose",
                                "content-type": "application/json; odata=verbose",
                                "X-RequestDigest": digest
                            },
                            success: function onSuccess(data) {
                                NProgress.done(true)
                                alert('create folder sukses')
                                this.createFolderInput = ''
                                this.isCreateFolder = false

                            },
                            error: function (data) {
                                alert(data.message)
                                NProgress.done(true)
                            }
                        });
                        // UpdateFolder(digest)
                        // }
                        // });
                    }
                });
            }
        },
        renameFolder() {
            var uriParent = this.parentActiveUri
            var uriTujuan = (uriParent.substring(uriParent.lastIndexOf("/") + 1));
            uriParent = (uriParent.substring(0, uriParent.lastIndexOf("/") + 1));
            var folder = this.choosedFolder
            var id = this.choosedFolderMetadata.Id
            var input = this.createFolderInput
            var nama = this.personalUrl
            NProgress.start()
            this.createFolderInput = ''
            // rename Folder
            $.ajax({
                url: uriParent + "/_api/contextinfo",
                type: "POST",
                headers: {
                    "Accept": "application/json;odata=verbose"
                },
                success: function (data) {
                    var digest = data.d.GetContextWebInformation.FormDigestValue;
                    var web = uriParent
                    NProgress.set(0.3)

                    renameFolder(web, uriTujuan, id, input, digest, folder)
                        .done(function () {
                            alert('Folder has been renamed');
                            NProgress.done(true)
                        })
                        .fail(
                            function (error) {
                                alert(error.responseJSON.error.message.value)
                                NProgress.done(true)

                            });
                }
            })
            function executeJson(url, method, additionalHeaders, payload, digest) {
                var headers = {};
                headers["Accept"] = "application/json;odata=verbose";
                if (method == "POST") {
                    headers["X-RequestDigest"] = digest;
                }
                if (typeof additionalHeaders != 'undefined') {
                    for (var key in additionalHeaders) {
                        headers[key] = additionalHeaders[key];
                    }
                }

                var ajaxOptions =
                {
                    url: url,
                    type: method,
                    contentType: "application/json;odata=verbose",
                    headers: headers
                };
                if (method == "POST") {
                    ajaxOptions.data = JSON.stringify(payload);
                }
                NProgress.set(0.7)
                return $.ajax(ajaxOptions);
            }

            function renameFolder(webUrl, listTitle, itemId, name, digest, folder) {
                var itemUrl = webUrl + "/_api/Web/Lists/GetByTitle('" + listTitle + "')/Items(" + itemId + ")";
                var itemPayload = {};
                itemPayload['__metadata'] = { 'type': folder.metadata.__metadata.type };
                itemPayload['Title'] = name;
                itemPayload['FileLeafRef'] = name;
                var additionalHeaders = {};
                additionalHeaders["X-HTTP-Method"] = "MERGE";
                additionalHeaders["If-Match"] = "*";

                NProgress.set(0.5)
                return executeJson(itemUrl, "POST", additionalHeaders, itemPayload, digest);
            }


            function getItemTypeForListName(name) {
                NProgress.set(0.4)
                return "SP.Data.GBI_x0020_OfficeItem";
            }
        },
        deleteFolder() {

            //delete folder
            if (this.isPersonal) {
                var pathFolder = this.linkFolder.replace("https://dokumen.bi.go.id", "")
                var uriParent = this.parentActiveUri
                uriParent = (uriParent.substring(0, uriParent.lastIndexOf("/") + 1));
                NProgress.start()
                var y = ""
                y = this.linkFolder.replace("https://dokumen.bi.go.id" + uriParent, "")
                this.folderDeleted = y
                //get form digest tujuan 
                NProgress.set(0.4)
                $.ajax({
                    url: uriParent + "_api/contextinfo",
                    type: "POST",
                    context: this,
                    headers: { "accept": "application/json;odata=verbose" },
                    success: function onSuccess(data) {
                        NProgress.set(0.9)
                        var digest = data.d.GetContextWebInformation.FormDigestValue
                        $.ajax({
                            url: uriParent + "_api/Web/Folders/add('" + y + "')",
                            type: "POST",
                            context: this,
                            headers: {
                                "accept": "application/json; odata=verbose",
                                "content-type": "application/json; odata=verbose",
                                "If-Match": "*",
                                "X-HTTP-Method": "DELETE",
                                "X-RequestDigest": digest
                            },
                            success: function onSuccess(data) {
                                NProgress.done(true)
                                this.isDeleteFolder = false
                                alert('hapus folder sukses')
                                // }
                                // });
                            },
                            error: function (data) {
                                alert(data.message.value)
                                NProgress.done(true)
                            }
                        });
                        // UpdateFolder(digest)
                        // }
                        // });
                    }
                });
            }
        },
        closeModalCopy: function () {
            this.isCopyModalChoosed = false
            this.isDownloadModalClicked = false
            this.isRequestModalClicked = false
        },
        addFile(e) {
            if (this.isPersonal) {
                this.isUpload = true
                this.isDownload = false
                let droppedFiles = e.dataTransfer.files;
                if (!droppedFiles) return;
                // this tip, convert FileList to array, credit: https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
                ([...droppedFiles]).forEach(f => {
                    this.files.push([f, f.name]);
                });
                this.filesShow = this.files
            } else {
                alert('silahkan pilih personal workspace')
            }
        },
        removeFile(file) {
            this.files = this.files.filter(f => {
                return f != file;
            });
        },
        uploadMutipleDocument: async function () {
            if (this.isPersonal && this.linkFolder) {
                var uriParent = this.parentActiveUri
                var uriTujuan = (uriParent.substring(uriParent.lastIndexOf("/") + 1));
                uriParent = (uriParent.substring(0, uriParent.lastIndexOf("/") + 1));
                var nama = this.personalUrl
                var files = this.files;
                this.files = []
                this.filesShow = []
                var x = 0
                if (files.length > 0) {
                    var webUrl = "https://dokumen.bi.go.id" + uriParent;
                    var path = this.linkFolder.replace("https://dokumen.bi.go.id", "")
                    var pathFull = this.linkFolder
                    var promises = []
                    var digest = ''
                    $.ajax({
                        url: webUrl + "/_api/contextinfo",
                        type: "POST",
                        headers: {
                            "Accept": "application/json;odata=verbose"
                        },
                        success: async function (data) {
                            NProgress.set(0.2)
                            var i = 0
                            digest = data.d.GetContextWebInformation.FormDigestValue;
                            while (i <= files.length - 1) {
                                promises.push(postUpdate(files[i], digest));
                                i++;
                            }
                            const datas = await Promise.all(promises);

                            NProgress.done(true)
                            alert('file sudah ter upload')
                            this.expand(this.choosedFolder)
                        }
                    })
                } else {
                    alert("Kindly select a file to upload.!")
                }

                async function postUpdate(file, digest) {
                    var file = file[0]
                    var digest = digest
                    return new Promise((resolve) => {
                        var temp = ''

                        var apiUrl = webUrl + "/_api/Web/GetFolderByServerRelativeUrl(@target)/Files/add(overwrite=true, url='" + file.name + "')?@target='" + path + "'&$expand=ListItemAllFields";
                        var getFile = getFileBuffer(file);
                        getFile.done(function (arrayBuffer) {
                            $.ajax({
                                url: apiUrl,//File Collection Endpoint
                                type: "POST",
                                data: arrayBuffer,
                                processData: false,
                                async: false,
                                headers: {
                                    "accept": "application/json;odata=verbose",
                                    "X-RequestDigest": digest,
                                },
                                success: function (data) {
                                    NProgress.set(0.7)

                                    resolve({
                                        data: {
                                            temp,
                                        },
                                    });
                                },
                                error: function (data) {
                                    console.log(data)
                                }
                            });
                        });
                    })
                }
            } else {
                alert('silahkan pilih personal workspace')
            }

            function getFileBuffer(uploadFile) {
                var deferred = jQuery.Deferred();
                var reader = new FileReader();
                reader.onloadend = function (e) {
                    deferred.resolve(e.target.result);
                }
                reader.onerror = function (e) {
                    deferred.reject(e.target.error);
                }
                reader.readAsArrayBuffer(uploadFile);
                NProgress.set(0.4)
                return deferred.promise();
            }

        },
        uploadDocument: async function () {
            var nama = this.personalUrl
            var files = $("#attachment")[0].files;
            var x = 0
            var z = 0
            if (files.length > 0) {
                var uriParent = this.parentActiveUri
                var uriTujuan = (uriParent.substring(uriParent.lastIndexOf("/") + 1));
                uriParent = (uriParent.substring(0, uriParent.lastIndexOf("/") + 1));
                NProgress.start()
                fileName = files[0].name;
                var webUrl = "https://dokumen.bi.go.id" + uriParent;
                var path = this.linkFolder.replace("https://dokumen.bi.go.id", "")
                var pathFull = this.linkFolder
                var documentLibrary = "testing";
                var promises = []
                var fixedPromises = ''
                var targetUrl = "/sites/mysite/personal/" + nama + "/Personal Lib/Personal/" + documentLibrary;
                // Construct the Endpoint
                var url = webUrl + "/_api/Web/GetFolderByServerRelativeUrl(@target)/Files/add(overwrite=true, url='" + fileName + "')?@target='" + path + "'&$expand=ListItemAllFields";
                $.ajax({
                    url: webUrl + "/_api/contextinfo",
                    type: "POST",
                    headers: {
                        "Accept": "application/json;odata=verbose"
                    },
                    success: async function (data) {
                        NProgress.set(0.2)
                        var digest = data.d.GetContextWebInformation.FormDigestValue;
                        // promises.push(uploadFileSingleMind(digest, files[0], url));
                        // promises = await uploadFileSingleMind(digest, files[0], url)

                        uploadFileToFolder(digest, files[0], url, function (data) {
                            var file = data.d;
                            DocFileName = file.Name;
                            var updateObject = {
                                __metadata: {
                                    type: file.ListItemAllFields.__metadata.type
                                },
                                FileLeafRef: DocFileName //FileLeafRef --> Internal Name for Name Column
                            };
                            alert("File uploaded successfully!");
                            x = 3
                            NProgress.done(true)
                            // global.expand(global.choosedFolder)
                        }, function (data) {
                            alert("File uploading failed");
                            NProgress.done(true)
                        });
                    }
                })
                // const datas = await Promise.all(promises);
                // // fixedPromises = await Promise.resolve(promises)
                while (z != 2) {
                    if (x == 3) {
                        NProgress.done(true)
                        // alert('selesai')
                        this.expand(this.choosedFolder)
                        z = 2
                    }
                    await this.timeout(800)
                }
            } else {
                alert("Kindly select a file to upload.!")
            }

            async function uploadFileSingleMind(digest, fileObj, url) {
                return new Promise((resolve) => {
                    var apiUrl = url;
                    var temp = 'asd'
                    // Initiate method calls using jQuery promises.
                    // Get the local file as an array buffer.
                    var getFile = getFileBuffer(fileObj);
                    // Add the file to the SharePoint folder.
                    getFile.done(function (arrayBuffer) {
                        $.ajax({
                            url: apiUrl,//File Collection Endpoint
                            type: "POST",
                            data: arrayBuffer,
                            processData: false,
                            async: false,
                            headers: {
                                "accept": "application/json;odata=verbose",
                                "X-RequestDigest": digest,
                            },
                            success: function (data) {
                                resolve({
                                    data: {
                                        temp,
                                    },
                                });
                                NProgress.set(0.7)
                            },
                            error: function (data) {
                                resolve({
                                    data: {
                                        temp,
                                    },
                                });
                                NProgress.set(0.7)
                            }
                        });
                    })
                })
            }

            function uploadFileToFolder(digest, fileObj, url, success, failure) {
                var apiUrl = url;
                // Initiate method calls using jQuery promises.
                // Get the local file as an array buffer.
                var getFile = getFileBuffer(fileObj);
                // Add the file to the SharePoint folder.
                getFile.done(function (arrayBuffer) {

                    $.ajax({
                        url: apiUrl,//File Collection Endpoint
                        type: "POST",
                        data: arrayBuffer,
                        processData: false,
                        async: false,
                        headers: {
                            "accept": "application/json;odata=verbose",
                            "X-RequestDigest": digest,
                        },
                        success: function (data) {
                            success(data);
                            NProgress.set(0.7)
                        },
                        error: function (data) {
                            success(data);
                        }
                    });
                });
            }
            function getFileBuffer(uploadFile) {
                var deferred = jQuery.Deferred();
                var reader = new FileReader();
                reader.onloadend = function (e) {
                    deferred.resolve(e.target.result);
                }
                reader.onerror = function (e) {
                    deferred.reject(e.target.error);
                }
                reader.readAsArrayBuffer(uploadFile);
                NProgress.set(0.4)
                return deferred.promise();
            }
        },
        checkboxUploadClicked: function () {

        },
        clearDownloadandUpload: function () {
            this.files = []
            this.filesShow = []
            this.listDownload = []
        },
        ascendingClicked: function () {
            this.isAscending = !this.isAscending
            this.selectedItems
        },
        resetSort: function () {
            this.isAscending = true
            if (this.sortSelected != '') {
            this.sortSelected = ''
            }
            this.advanceSortSelectedtemp = []
            this.fixedAdvanceSort = []
            this.tempSort = []
            this.advanceSortSelected = []

        },
        AdvanceButtonAscClicked(item) {
            for (i in this.fixedAdvanceSort) {
                if (this.fixedAdvanceSort[i].indexOf(item) != -1) {
                    if (this.fixedAdvanceSort[i][1] == 'asc') {
                        this.fixedAdvanceSort[i][1] = 'desc'
                    } else {
                        this.fixedAdvanceSort[i][1] = 'asc'
                    }
                }
            }
            this.backdoor++
        },
        bukaModalCopyVue: async function (ext) {
            this.isCopyModalChoosed = true
            this.isDownloadModalClicked = false
            this.isRequestModalClicked = false
            console.log(ext)
            this.workspaceUndragged()
            let arrTemp = [this.listTemp[0].uri, this.listTemp[0].name, this.listTemp[0].tipe, this.listTemp[0].metadata]
            // this.listDownload.push(arrTemp)
            this.listTemp = arrTemp
            this.openModalCopyFile(this.listPersonal[0], "drag")
            let modalCopy = document.getElementById("universalModal");
            modalCopy.style.display = "block";
        },
        getListParent: async function (input, index) {
            var server = _spPageContextInfo.webAbsoluteUrl;
            const myArr = server.split("/", 3);
            $.ajax({
                url: input,
                type: "GET",
                context: this,
                headers: { "accept": "application/json;odata=verbose" },
                success: async function onSuccess(data) {
                    if (data.user != undefined) {
                        const uri = data.spPageContextInfo.webAbsoluteUrl + "/_api/Web/GetFolderByServerRelativeUrl('" + data.spPageContextInfo.webServerRelativeUrl + this.ListWorkspaceAvailable[index][1] + "')"
                        console.log(uri)
                        $.ajax({
                            url: uri,
                            type: "GET",
                            context: this,
                            headers: { "accept": "application/json;odata=verbose" },
                            success: function onSuccess(data) {
                                console.log(data.d)
                                if (this.ListWorkspaceAvailable[index][1] == 'Shared Documents') {
                                    this.getWorkspace()
                                } else {
                                    this.listPersonal.push(data.d)
                                    console.log('personal')
                                    console.log(this.listPersonal)
                                    this.treeviewCopy.children.push({ name: data.d.Name, level: 1, filesUri: data.d.Files.__deferred.uri, folderUri: data.d.Folders.__deferred.uri, folderId: 'copy' + myArr[0] + "/" + myArr[1] + "/" + myArr[2] + data.d.ServerRelativeUrl, folderLocation: myArr[0] + "/" + myArr[1] + "/" + myArr[2] + data.d.ServerRelativeUrl, metadata: data.d.ListItemAllFields })
                                    this.isPersonalLoading = false
                                }
                                // this.listParent = data.d.Folders.results
                            }
                        });
                    } else {
                        if (this.ListWorkspaceAvailable[index][1] == 'Shared Documents') {
                            this.isParentLoading = false
                        }
                        console.log('tidak')
                    }
                }
            })
        },
        reasignSort() {
            this.advanceSortSelectedTemp = this.advanceSortSelected
        },
        // Get the local file as an array buffer.
        testApi: async function () {
            // function timeout(ms) { //pass a time in milliseconds to this function
            // console.log('ini sebelum')
            // console.log('timeout')
            // console.log(this.findAllDoclib)
            // return new Promise(resolve => setTimeout(resolve, ms));
            //       }
            let x = _spPageContextInfo
            console.log(x)
            // let ix =  _SPWeb
            // console.log(ix)
            //   $.ajax({

            //   url: _spPageContextInfo.webAbsoluteUrl + "/_api/Web/effectiveBasePermissions",

            //   type: "GET",
            //   context: this,
            //   headers: { "accept": "application/json;odata=verbose" },
            //   success: function onSuccess(data) {
            //       console.log(data.d)
            //       // this.listPersonal.push(data.d)
            //     // this.listParent = data.d.Folders.results


            //   }
            // });
            // checkPermissions()
            // getUserWebPermissionREST()
            // $.ajax({
            //     url: "https://dokumen.bi.go.id/sites/documentCenter_gbioffc/_api/Web/GetFolderByServerRelativeUrl('/sites/documentCenter_gbioffc')?$expand=Folders",

            //     type: "GET",
            //     context: this,
            //     headers: { "accept": "application/json;odata=verbose" },
            //     success: function onSuccess(data) {
            //         console.log(data)
            //         // for (i in data.d.query.PrimaryQueryResult.RelevantResults.Table.Rows.results){


            //         // this.listPersonal.push(data.d)
            //       // this.listParent = data.d.Folders.results


            //     }
            //   });


            //  $.ajax({

            //   url: "https://dokumen.bi.go.id/sites/documentCenter_DGdoc/_api/search/query?querytext='contentclass%3aSTS_Site+AND+path%3ahttps%3a%2f%2fdokumen.bi.go.id%2fsites%2f+AND+documentCenter'&rowlimit=10&selectproperties='Event%2cKeyword'&sortlist='Rank%3adescending'",

            //   type: "GET",
            //   context: this,
            //   headers: { "accept": "application/json;odata=verbose" },
            //   success: function onSuccess(data) {
            //     var check=false
            //       console.log(data.d.query.PrimaryQueryResult.RelevantResults.Table.Rows.results[0].Cells.results[9].Value)
            //       for (i in data.d.query.PrimaryQueryResult.RelevantResults.Table.Rows.results){
            //         for (y in this.ListWorkspaceAvailable){
            //           if (data.d.query.PrimaryQueryResult.RelevantResults.Table.Rows.results[i].Cells.results[9].Value == this.ListWorkspaceAvailable[y][0]){
            //             if(this.ListWorkspaceAvailable[y][0] == 'Dewan Gubernur Workspace'){
            //             this.getWorkspace()
            //             check = true
            //             }else{
            //             $.ajax({
            //             url: data.d.query.PrimaryQueryResult.RelevantResults.Table.Rows.results[i].Cells.results[72].Value+"/_api/Web/GetFolderByServerRelativeUrl('"+this.ListWorkspaceAvailable[y][1]+"')",
            //             type: "GET",
            //             context: this,
            //             headers: { "accept": "application/json;odata=verbose" },
            //             success: function onSuccess(data) {
            //                 console.log(data.d)
            //                 this.listPersonal.push(data.d)
            //               // this.listParent = data.d.Folders.results
            //             }
            //           });
            //             }
            //             break
            //           }
            //         }
            //       }
            //       if (check == false){
            //         this.isParentLoading = false
            //         alert('anda tidak memiliki akses ke Dewan Gubernur Workspace. silahkan hubungi administrator')
            //       }
            //       // this.listPersonal.push(data.d)
            //     // this.listParent = data.d.Folders.results


            //   }
            // });


            //  $.ajax({

            //   url: "https://dokumen.bi.go.id/sites/documentCenter_gbioffc/_api/Web/GetFolderByServerRelativeUrl('/sites/documentCenter_dgsoffc/DGS Office')",

            //   type: "GET",
            //   context: this,
            //   headers: { "accept": "application/json;odata=verbose" },
            //   success: function onSuccess(data) {
            //       console.log(data.d)
            //       this.listPersonal.push(data.d)
            //     // this.listParent = data.d.Folders.results


            //   }
            // });
            // $.ajax({

            //   url: "https://dokumen.bi.go.id/sites/documentCenter_adg3offc/_api/Web/GetFolderByServerRelativeUrl('/sites/documentCenter_adg3offc/ADG3 Office')",

            //   type: "GET",
            //   context: this,
            //   headers: { "accept": "application/json;odata=verbose" },
            //   success: function onSuccess(data) {
            //       console.log(data.d)
            //       this.listPersonal.push(data.d)
            //     // this.listParent = data.d.Folders.results


            //   }
            // });
            // $.ajax({

            //   url: "https://dokumen.bi.go.id/sites/documentCenter_gbioffc",

            //   type: "GET",
            //   context: this,
            //   headers: { "accept": "application/json;odata=verbose" },
            //   success: function onSuccess(data) {
            //       console.log(data.d)
            //       this.listPersonal.push(data.d)
            //     // this.listParent = data.d.Folders.results


            //   }
            // });
            // var workspace = this.ListWorkspaceAvailable

            // https://dokumen.bi.go.id/sites/documentCenter_gbioffc/GBI%20Office/_api/web/getfilebyserverrelativeurl('/sites/documentCenter_gbioffc/GBI%20Office/BIPOLMIX/DKom_RDGB-Hari%20Kedua_PS12_Siaran%20Pers_25%20Mei%202021.docx')
            // var pathFolder = this.linkFolder.replace("https://dokumen.bi.go.id", "")
            // var path = this.fileSelected.uri.replace("https://dokumen.bi.go.id", "")
            // var nama = this.personalUrl
            // var uriParent = this.parentActiveUri
            // $.ajax({
            //   url: "https://dokumen.bi.go.id/sites/documentCenter_gbioffc/GBI%20Office/_api/contextinfo",
            //   type: "POST",
            //   headers: {
            //     "Accept": "application/json;odata=verbose"
            //   },
            //   success: function (data) {
            //     var digest = data.d.GetContextWebInformation.FormDigestValue;
            //     // var web = uriParent + "/"
            //     $.ajax(
            //       {
            //         url: "https://dokumen.bi.go.id/sites/documentCenter_gbioffc/_api/web/getfilebyserverrelativeurl('/sites/documentCenter_gbioffc/GBI%20Office/BIPOLMIX/DKom_RDGB-Hari%20Kedua_PS12_Siaran%20Pers_25%20Mei%202021.docx')",
            //         method: "POST",
            //         headers: {
            //           "accept": "application/json;odata=verbose",
            //           "content-type": "application/json;odata=verbose",
            //           "X-HTTP-Method": "DELETE",
            //           "If-Match": "*",
            //           "X-RequestDigest": digest
            //         },
            //         success: function (data) {
            //           console.log(data)
            //           alert('hapus file sukses')
            //           NProgress.done(true)
            //         },
            //         error: function (data) {
            //           console.log(data)
            //           alert(data.message.value)
            //           NProgress.done(true)
            //         }
            //       });
            //   }
            // })
            // ieu
            // $.ajax({

            //   url: "https://dokumen.bi.go.id/sites/documentCenter_DGdoc/_api/contextinfo",
            //     // url: "https://dokumen.bi.go.id/sites/mysite/personal/yulianto_an_i/_api/contextinfo",
            //         type: "POST",
            //     context:this,
            //     headers:{ "accept": "application/json;odata=verbose" },
            //     success: async function onSuccess(data) {
            //       var digest = data.d.GetContextWebInformation.FormDigestValue;
            //       $.ajax({
            // //  "https://dokumen.bi.go.id/sites/documentCenter_DGdoc/Shared Documents/01. RDG Bulanan/2021/01. Jan-H1/DPD_RDGB-Hari Pertama_PS01_Tayangan_Isu Strategis_20 Januari 2021.pdf"
            // // ServerRelativeUrl: "/sites/mysite/personal/yulianto_an_i/Personal Lib/Personal/anak/serepet123.docx"

            // // url:"https://dokumen.bi.go.id/sites/mysite/personal/yulianto_an_i/_api/web/getfilebyserverrelativeurl('/sites/mysite/personal/yulianto_an_i/Personal Lib/Personal/anak/serepet123.docx')/copyto(strnewurl='/sites/mysite/personal/yulianto_an_i/Personal Lib/Personal/anak/serepet1234.docx',boverwrite=true)",
            //   url: "https://dokumen.bi.go.id/sites/documentCenter_DGdoc/_api/web/getfilebyserverrelativeurl('/sites/documentCenter_DGdoc/Shared Documents/01. RDG Bulanan/2021/01. Jan-H1/DPD_RDGB-Hari Pertama_PS01_Tayangan_Isu Strategis_20 Januari 2021.pdf')/copyto(strnewurl='/sites/mysite/personal/yulianto_an_i/Personal Lib/test/DPD_RDGB-Hari Pertama_PS01_Tayangan_Isu Strategis_20 Januari 20212.pdf',boverwrite=true)",
            //   type: "POST",
            //   context: this,
            //   headers: { "accept": "application/json;odata=verbose","X-RequestDigest":  digest },
            //   success: function onSuccess(data) {
            //       console.log(data.d)
            //       // this.listPersonal.push(data.d)
            //     // this.listParent = data.d.Folders.results


            //   }
            // });
            //       }
            // })

            // $.ajax({

            //   url: "https://dokumen.bi.go.id/sites/documentCenter_adg6offc/_api/Web/GetFolderByServerRelativeUrl('/sites/documentCenter_adg6offc/ADG6 Office')",

            //   type: "GET",
            //   context: this,
            //   headers: { "accept": "application/json;odata=verbose" },
            //   success: function onSuccess(data) {
            //       console.log(data.d)
            //       this.listPersonal.push(data.d)
            //     // this.listParent = data.d.Folders.results


            //   }
            // });
            // console.log(x)

            // $.ajax({
            //   url: "https://dokumen.bi.go.id/sites/Workspace_Dev/_api/contextinfo",
            //       type: "POST",
            //   context:this,
            //   headers:{ "accept": "application/json;odata=verbose" },
            //   success: async function onSuccess(data) {
            //     var digest = data.d.GetContextWebInformation.FormDigestValue;
            //     console.log(digest)
            //     // console.log(x)
            //     console.log(data)
            // url:"https://dokumen.bi.go.id/sites/Workspace_Dev/_api/web/currentUser?",
            // url:"https://dokumen.bi.go.id/sites/Workspace_Dev//_api/sp.userprofiles.peoplemanager/getmyproperties",
            // url:"https://dokumen.bi.go.id/sites/mysite/personal/yulianto_an_i/_layouts/15/userphoto.aspx?size=<M>&accountname=<"+x+">",
            // url:"https://dokumen.bi.go.id/sites/Workspace_Dev//_api/web/getuserbyid(11)",

            // url:"https://dokumen.bi.go.id/sites/documentCenter_DGdoc/_api/web/navigation/QuickLaunch",
            // "https://dokumen.bi.go.id/sites/documentCenter_DGdoc/_api/Web/GetFolderByServerRelativeUrl('/sites/documentCenter_DGdoc/Shared%20Documents/')?$expand=Folders,Files",
            // url : "https://dokumen.bi.go.id/sites/documentCenter_DGdoc/_api/Web/GetFolderByServerRelativePath(decodedurl='/sites/documentCenter_DGdoc/Shared%20Documents/RDG/RDG%20Bulanan/2021/01.%20Januari%20(TW%20IV)/Hari%201')/Files?$expand=ListItemAllFields,Author,Properties,ModifiedBy",
            // url : "https://bankindonesiagov-my.sharepoint.com/personal/yulianto_an_i_bi_go_id/_api/search/query?querytext='mahroj'",
            // url : "https://dokumen.bi.go.id/sites/mysite/personal/yulianto_an_i/_api/Web/GetFolderByServerRelativeUrl('/sites/mysite/personal/yulianto_an_i/Documents/')?$expand=Folders/ListItemAllFields,Files/ListItemAllFields,Files/Author,ListItemAllFields/File,Activities,Files/ListItemAllFields/Properties",
            // url : "https://dokumen.bi.go.id/sites/documentCenter_DGdoc/_api/Web/GetFileByServerRelativePath(decodedurl='/sites/documentCenter_DGdoc/Shared%20Documents/RDG/RDG%20Bulanan/2021/04.%20April%20(TW%20I)/Hari%202/DKEM_RDGB-Hari%20Kedua_PS01_Tayangan_Moneter_Penetapan%20Bauran%20Kebijakan_20%20April%202021.pptx')/ListItemAllFields",
            // url : "https://dokumen.bi.go.id/sites/documentCenter_DGdoc/_api/search/query?querytext='(title%3adkem+AND+path%3ahttps%3a%2f%2fdokumen.bi.go.id%2fsites%2fdocumentCenter_DGdoc%2fShared%2520Documents%2fRDG)+AND+isDocument%3atrue'&rowlimit=50&clienttype='ContentSearchRegular'",
            // url : "https://dokumen.bi.go.id/sites/documentCenter_DGdoc/_api/search/query?querytext='(path%3ahttps%3a%2f%2fdokumen.bi.go.id%2fsites%2fdocumentCenter_DGdoc%2fShared%2520Documents)and+title%3adkem+soe'&rowlimit=10&selectproperties='Event%2cPS%2csatkerPembuat%2ctipeDokumen%2cPresenter%2cKeyword%2cnamaTopik'&sortlist='Rank%3adescending%2cmodifiedby%3aascending'",
            // url : "https://dokumen.bi.go.id/sites/documentCenter_DGdoc/_api/Web/GetFileByServerRelativePath(decodedurl='/sites/documentCenter_DGdoc/Shared%20Documents/RDG/RDG%20Bulanan/2021/01.%20Januari%20(TW%20IV)/Hari%201/DPD_RDGB-Hari%20Pertama_PS01_Tayangan_Isu%20Strategis_20%20Januari%202021.pdf')/ListItemAllFields/Properties",

            // Do something with final result

            //rename Folder
            // $.ajax({
            //           url:"https://dokumen.bi.go.id/sites/mysite/personal/yulianto_an_i/_api/contextinfo",
            //           type: "POST",
            //           headers: {
            //             "Accept": "application/json;odata=verbose"
            //           },
            //           success: function (data) {
            //             var digest = data.d.GetContextWebInformation.FormDigestValue;
            //             var web = "https://dokumen.bi.go.id/sites/mysite/personal/yulianto_an_i/"

            // renameFolder(web,'Personal Lib',81,'Archive',digest)
            // .done(function()
            // {
            //     console.log('Folder has been renamed');
            // })
            // .fail(
            // function(error){
            //     console.log(JSON.stringify(error));
            // });
            //           }
            // })
            //   function executeJson(url,method,additionalHeaders,payload,digest) 
            // {
            //     var headers = {};
            //     headers["Accept"] = "application/json;odata=verbose";
            //     if(method == "POST") {
            //         headers["X-RequestDigest"] = digest;
            //     }   
            //     if (typeof additionalHeaders != 'undefined') {
            //         for(var key in additionalHeaders){
            //             headers[key] = additionalHeaders[key];
            //         }    
            //     }    

            //     var ajaxOptions = 
            //     {       
            //        url: url,   
            //        type: method,  
            //        contentType: "application/json;odata=verbose",
            //        headers: headers
            //     };
            //     if(method == "POST") {
            //       ajaxOptions.data = JSON.stringify(payload);
            //     }  

            //     return $.ajax(ajaxOptions);
            // }

            // function renameFolder(webUrl,listTitle,itemId,name,digest)
            // {
            //      var itemUrl =  webUrl + "/_api/Web/Lists/GetByTitle('" + listTitle + "')/Items(" + itemId + ")";
            //      var itemPayload = {};
            //      itemPayload['__metadata'] = {'type': getItemTypeForListName(listTitle)};
            //      itemPayload['Title'] = name;
            //      itemPayload['FileLeafRef'] = name;
            //      var additionalHeaders = {};
            //      additionalHeaders["X-HTTP-Method"] = "MERGE";
            //      additionalHeaders["If-Match"] =  "*";
            //      console.log(itemPayload)
            //      return executeJson(itemUrl,"POST",additionalHeaders,itemPayload,digest);
            // }


            // function getItemTypeForListName(name) {
            //    return"SP.Data.Personal_x0020_LibItem";
            // }


            // var urlAsli = "https://dokumen.bi.go.id/sites/documentCenter_DGdoc/_api/Web/GetFolderByServerRelativePath(decodedurl='/sites/documentCenter_DGdoc/Shared%20Documents/RDG')/Folders?$expand=ListItemAllFields"
            // console.log(urlAsli)
            // $.ajax({
            //   url: urlAsli,
            //   type: "GET",
            //   context: this,
            //   headers: { "accept": "application/json;odata=verbose" },
            //   success: function onSuccess(data) {
            //     console.log(data)
            //   }
            // });

            // $.ajax({
            //                     url: "https://dokumen.bi.go.id/sites/mysite/personal/yulianto_an_i/_api/web/lists/getbytitle('Personal Lib')/items?$filter=FileLeafRef eq 'DSta_RDGB-Hari Pertama_PS01_Tayangan_Moneter_Isu Strategis_20 Januari 2021.pdf'&$select=*",
            //                     type: "GET",
            //                     context: this,
            //                     headers: { "accept": "application/json;odata=verbose" },
            //                     success: async function onSuccess(data) {
            //                       console.log(data)
            //                     }})

            // console.log(this.files)


            // $.ajax({
            //   url: "https://dokumen.bi.go.id/sites/mysite/personal/yulianto_an_i/_api/contextinfo",
            //   type: "POST",
            //   headers: {
            //     "Accept": "application/json;odata=verbose"
            //   },
            //   success: function (data) {
            //     var digest = data.d.GetContextWebInformation.FormDigestValue;
            //     var web = "https://dokumen.bi.go.id/sites/mysite/personal/yulianto_an_i/"
            //     $.ajax(
            //       {
            //         url: "https://dokumen.bi.go.id/sites/mysite/personal/yulianto_an_i/_api/web/getfilebyserverrelativeurl('/sites/mysite/personal/yulianto_an_i/Personal Lib/Personal/Absensi.txt')",
            //         method: "POST",
            //         headers: {
            //           "accept": "application/json;odata=verbose",
            //           "content-type": "application/json;odata=verbose",
            //           "X-HTTP-Method": "DELETE",
            //           "If-Match": "*",
            //           "X-RequestDigest": digest
            //         },
            //         success: function (data) {
            //           console.log(data)
            //           alert('hapus file sukses')
            //         }
            //       });
            //   }
            // })





            //   // get form digest tujuan 
            //   $.ajax({
            // url:"https://dokumen.bi.go.id/sites/mysite/personal/yulianto_an_i/_api/web/lists/getbytitle('Personal Lib')/items?$select=FileLeafRef,Title,Id",
            // type:"GET",
            // context:this,
            // headers:{ "accept": "application/json;odata=verbose" },
            // success: async function onSuccess(data) {
            //   // console.log(x)
            //   console.log(data)
            // // }
            //   // });
            // }
            //   });









        }
    },
});