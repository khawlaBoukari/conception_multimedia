const canvas=document.getElementById('canvas');
const ctx= canvas.getContext('2d');

let img=new Image();
let fileName='';

const downloadBtn=document.getElementById('download-btn');
const uploadFile=document.getElementById('upload-file');
const revertbtn=document.getElementById('revert-btn');
//les filtres
document.addEventListener('click',(e)=>{
    if(e.target.classList.contains('filter-btn')){
        if(e.target.classList.contains('brightness-add')){
            Caman('#canvas',img,function(){
                this.brightness(5).render();
            });

        }
        else if(e.target.classList.contains('brightness-remove')){
            Caman('#canvas',img,function(){
                this.brightness(-5).render();
            });
        }
        else if(e.target.classList.contains('contrast-add')){
            Caman('#canvas',img,function(){
                this.contrast(5).render();
            });
        }else if(e.target.classList.contains('contrast-remove')){
            Caman('#canvas',img,function(){
                this.contrast(-5).render();
            });
        }else if(e.target.classList.contains('saturation-add')){
            Caman('#canvas',img,function(){
                this.saturation(5).render();
            });
        }else if(e.target.classList.contains('saturation-remove')){
            Caman('#canvas',img,function(){
                this.saturation(-5).render();
            });
        }else if(e.target.classList.contains('vibrance-add')){
            Caman('#canvas',img,function(){
                this.vibrance(5).render();
            });
        }else if(e.target.classList.contains('vibrance-remove')){
            Caman('#canvas',img,function(){
                this.vibrance(-5).render();
            });
        }else if(e.target.classList.contains('vintage-add')){
            Caman('#canvas',img,function(){
                this.vintage().render();
            });
        }else if(e.target.classList.contains('lomo-add')){
            Caman('#canvas',img,function(){
                this.lomo().render();
            });
        }else if(e.target.classList.contains('clarity-add')){
            Caman('#canvas',img,function(){
                this.clarity().render();
            });
        }else if(e.target.classList.contains('sincity-add')){
            Caman('#canvas',img,function(){
                this.sinCity().render();
            });
        }else if(e.target.classList.contains('crossprocess-add')){
            Caman('#canvas',img,function(){
                this.crossProcess().render();
            });
        }else if(e.target.classList.contains('nostalgia-add')){
            Caman('#canvas',img,function(){
                this.nostalgia().render();
            });
        }else if(e.target.classList.contains('pinhole-add')){
            Caman('#canvas',img,function(){
                this.pinhole().render();
            });
        }else if(e.target.classList.contains('hermajesty-add')){
            Caman('#canvas',img,function(){
                this.herMajesty().render();
            });
        }

    }
});
//reset button
revertbtn.addEventListener('click',e=>{
    Caman('#canvas', img, function(){
        this.revert();
    });
});


//upload
uploadFile.addEventListener('change',(e)=>{
    const file=document.getElementById('upload-file').files[0];

    //init FileReader
    const reader=new FileReader();
    if(file){
        fileName=file.name;
        reader.readAsDataURL(file);
    }reader.addEventListener('load',()=>{
        img.src=reader.result;
        img.onload=function(){
            canvas.width=img.width;
            canvas.height=img.height;
            ctx.drawImage(img,0,0,img.width,img.height);
            canvas.removeAttribute('data-caman-id');
        }
    },false);
});
//enregistrer
downloadBtn.addEventListener('click',e=>{
    const fileExtension=fileName.slice(-4);
    let newFileName;
    if(fileExtension==='.jpg' || fileExtension==='.png'){
        newFileName=fileName.substring(0,fileName.length-4)+'-edited.jpg';
    }
    download(canvas,newFileName);
    });
function download(canvas,filename){
    let e;
    const link=document.createElement('a');
    link.download=filename;
    link.href=canvas.toDataURL('image/jpeg',0.8);
    e=new MouseEvent('click');
    link.dispatchEvent(e);
}
(function() {

    var streaming = false,
        video        = document.querySelector('#video'),
        cover        = document.querySelector('#cover'),
        canvas       = document.querySelector('#canvas'),
        photo        = document.querySelector('#photo'),
        startbutton  = document.querySelector('#startbutton'),
        width = 320,
        height = 0;
        navigator.getMedia = ( navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia);
            navigator.getMedia(
                {
                  video: true,
                  audio: false
                },
                function(stream) {
                  if (navigator.mozGetUserMedia) {
                    video.mozSrcObject = stream;
                  } else {
                    var vendorURL = window.URL || window.webkitURL;
                    video.src = vendorURL.createObjectURL(stream);
                  }
                  video.play();
                },
                function(err) {
                  console.log("An error occured! " + err);
                }
              );
              video.addEventListener('canplay', function(ev){
                if (!streaming) {
                  height = video.videoHeight / (video.videoWidth/width);
                  video.setAttribute('width', width);
                  video.setAttribute('height', height);
                  canvas.setAttribute('width', width);
                  canvas.setAttribute('height', height);
                  streaming = true;
                }
              }, false);
              startbutton.addEventListener('click', function(ev){
                takepicture();
              ev.preventDefault();
            }, false);
            function takepicture() {
                canvas.width = width;
                canvas.height = height;
                canvas.getContext('2d').drawImage(video, 0, 0, width, height);
                var data = canvas.toDataURL('image/png');
                photo.setAttribute('src', data);
              }
            
            })();