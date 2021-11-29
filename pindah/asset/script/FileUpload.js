Vue.config.productionTip = false;
Vue.config.devtools = false;

Vue.filter('kb', val => {
    return Math.floor(val / 1024);
});

const app = new Vue({
    el: '#app',
    data: {
        files: []
    },
    computed: {
        uploadDisabled() {
            return this.files.length === 0;
        }
    },
    methods: {
        addFile(e) {
            let droppedFiles = e.dataTransfer.files;
            if (!droppedFiles) return;
            // this tip, convert FileList to array, credit: https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
            ([...droppedFiles]).forEach(f => {
                this.files.push(f);
            })
        },
        removeFile(file) {
            this.files = this.files.filter(f => {
                return f != file;
            });
        },
        upload() {

            let formData = new FormData();
            this.files.forEach((f, x) => {
                formData.append('file' + (x + 1), f);
            });

            fetch('https://httpbin.org/post', {
                method: 'POST',
                body: formData
            })
                .then(res => res.json())
                .then(res => {
                    console.log('done uploading', res);
                })
                .catch(e => {
                    console.error(JSON.stringify(e.message));
                });

        }
    }
})