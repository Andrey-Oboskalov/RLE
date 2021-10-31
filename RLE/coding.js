let fs = require('fs');
let arg = process.argv;
let inText;
let i = 0, n = 1;
let out = "";
let ln;

if (arg[2] == 'code') {
	fs.readFile(arg[3], (err, data) => {
		if (err){
			console.error(err);
			return;
		}

		inText = data.toString();

		//Сжатие
		while (i < inText.length){
			while(inText.charAt(i) == inText.charAt(i+n)){
				n++;
			}

			ln = n
			if (inText.charAt(i) == '#'){
				while (ln > 255){
					out += '#' + String.fromCharCode(255) + inText.charAt(i)
					ln -= 255
				}
				out += '#' + String.fromCharCode(ln) + inText.charAt(i)
			}

			else {
				if (n >= 4) {
					while (ln > 259){
						out += '#' + String.fromCharCode(259-4) + inText.charAt(i)
						ln -= 259
					}

					if (ln >= 4) {
						out += '#' + String.fromCharCode(ln-4) + inText.charAt(i)
					}
					else {
						out += inText.charAt(i).repeat(ln)
					}
				}
				else {
					out += inText.charAt(i).repeat(n)
				}
			}

			i += n;
			n = 1;
		}

		//Файл
		fs.writeFile(arg[4], out, (err) => {
			if (err){
				console.error(err);
				return;
			}
		});	
	});
}
