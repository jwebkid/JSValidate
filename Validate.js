var Validate = function(config){
	this.config = config;
	this.errors = {};
	this.messages = {
		"min": ":field field needs to be at least :rule characters long.",
		"max": ":field must not be greater than :rule.",
		"required": ":field is required.",
		"email": ":field must be a valid email address.",
		"regex": ":field format is invalid."
	}

	this.fails = function(){
		return this.errors.length == 0 ? true : false;
	}

	this.passes = function(){
		return this.errors.length != 0 ? true : false;
	}

	this.exec = function(){
		this.errors = {};
		for(key in config){
			if(config.hasOwnProperty(key)){
				var inputName = inputId = key;

				if(key.indexOf('|') != -1){
					var inputArray = key.split('|');
					inputName = inputArray[1];
					inputId = inputArray[0];
				}

				var inputElement = document.getElementById(inputId);

				if(inputElement != undefined){
					for(rule in config[key]){
						if(config[key].hasOwnProperty(rule)){
							if(this[rule] != undefined && !this[rule](inputElement.value, config[key][rule])){
								if(this.errors[inputId] == undefined)
									this.errors[inputId] = [];

								this.errors[inputId].push(this.messages[rule].replace(':field', inputName).replace(':rule', config[key][rule]));
							}
						}
					}
				}else{
					if(config[key].hasOwnProperty('required')){
						if(this.errors[inputId] == undefined)
							this.errors[inputId] = [];
						this.errors[inputId].push(this.messages['required'].replace(':field', inputName).replace(':rule', config[key][rule]));
					}
				}
			}
		}
	}

	this.min = function(value, rule){
		return value.length >= rule;
	}

	this.max = function(value, rule){
		return value.length <= rule;
	}

	this.required = function(value, rule){
		if(rule){
			return (value.length != 0);
		}else{
			return true;
		}
	}

	this.email = function(value, rule){
		if(rule){
			var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(value);
		}else{
			return true;
		}
	}

	this.regex = function(value, rule){
		return value.match(rule);
	}
}