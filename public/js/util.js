let DEBUG = false;

let util = {
	newRequest: function(type, path, params) {
		let request;

		if (type == "GET") {
			request = new Request(path + this.uriParams(params), {
				method: 'GET',
				credentials: 'same-origin',
				headers:{
					"content-type":"application/json"
				}
			});
		} else if (type == 'PUT') {
			request = new Request(path + this.uriParams(params), {
				method: 'PUT',
				credentials: 'same-origin',
				headers:{
					"Content-type":"application/json"
				}
			});
		} else if (type == 'POST') {
			request = new Request(path, {
				method: 'POST',
				credentials: 'same-origin',
				body: JSON.stringify(params),
				headers:{
					"Content-type":"application/json"
				}
			});
		}

		return request;
	},

	getPresList: function() {
		let list = fetch(util.newRequest('GET', '/user/preslist', {})).then(res => {
		    return res.json();
		}).then(res => {
			return res;
		}).catch(err => {
		    util.printError(err);
		});

		return list;
	},

	isNotEmpty: function(...str) {
	    let state = true;

	    str.forEach(item => {
	        if (item == null || item == undefined) {
	            state = false;
	        } else if(!item.replace(/\s/g, "").length > 0) {
	            state = false;
	        }
	    });

	    return state;
	},

	uriParams: function(params) {
		let esc = encodeURIComponent;
		let query = Object.keys(params).map(k => esc(k) + '=' + esc(params[k])).join('&');
		return '?' + query;
	},

	printError: function(...lines) {
		if(DEBUG){
			lines.forEach(item => {
				console.error(item);
			});
		}
	}
}