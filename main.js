const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const input = document.querySelector('#file');
input.addEventListener('change', async () => {
    for (let i = 0; i < input.files.length; i++) {
        let res = await new Promise(resolve => {
            if (!input.files[i].type.match(/image\/.*/)) {
                resolve(false);
            }
            let reader = new FileReader();
            reader.addEventListener('load', () => {
                let image = new Image();
                image.src = reader.result;
                image.addEventListener('load', () => {
                    canvas.width = image.width;
                    canvas.height = image.height;
                    ctx.drawImage(image, 0, 0);
                    let webpURI = canvas.toDataURL('image/webp');
                    const a = document.createElement('a');
                    a.href = webpURI;
                    a.download = input.files[i].name + '.webp';
                    a.click();
                    console.log(input.files[i].name);
                    setTimeout(() => resolve(true), 200);
                });
            });
            reader.readAsDataURL(input.files[i]);
        });
        if (!res) {
            console.error(input.files[i]);
        }
    }
});
window.addEventListener('load', () => {
    if (!canvas.toDataURL('image/webp').match('data:image/webp')) {
        input.disabled = true;
        alert('お使いのブラウザには対応していません。');
    }
});
