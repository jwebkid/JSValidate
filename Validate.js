/*
*
*	@author Luca Tabone | lucatabone.com
*
* 	Creates an instance of Validate
*	@constructor
*	@param {JSON} config Rules to be applied to their respective Input Element
*/
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
	
	/*
	* Returns whether the validation has failed or not
	* @return {boolean} TRUE if the validation had failed FALSE otherwise
	*/
	this.fails = function(){
		return Object.keys(this.errors).length == 0 ? false : true;
	}

	
	/*
	* Returns whether the validation has passed or not
	* @return {boolean} TRUE if the validation had passed FALSE otherwise
	*/
	this.passes = function(){
		return Object.keys(this.errors).length == 0 ? true : false;
	}

	
	/*
	* Validation method
	* @return void
	*/
	this.exec = function(){
		//Reset the error object
		this.errors = {};
		
		//Loops through each Input Element ID
		for(key in config){
			//Makes sure that the key is an own property of the JSON Rule Passed
			if(config.hasOwnProperty(key)){
				//Sets some attributes
				var inputName = inputId = key;

				//If the element id contain the pipe '|' it means the
				//user is making use of a custom name for the error message
				if(key.indexOf('|') != -1){
					var inputArray = key.split('|');
					inputName = inputArray[1];
					inputId = inputArray[0];
				}

				//Gets the actual element from the DOM
				var inputElement = document.getElementById(inputId);

				//Checks whether it is undefined or not
				if(inputElement != undefined){
					//Loop through each rule
					for(rule in config[key]){
						//Again checks whether the rule is an own property of the JSON
						if(config[key].hasOwnProperty(rule)){
							//Checks whether there is a rule method and validate the value
							if(this[rule] != undefined && !this[rule](inputElement.value, config[key][rule])){
								//If the validation failed, 'Validate' creates the message
								if(this.errors[inputId] == undefined)
									this.errors[inputId] = [];

								this.errors[inputId].push(this.messages[rule].replace(':field', inputName).replace(':rule', config[key][rule]));
							}
						}
					}
				}else{
					//If it is checks whether it was set to required
					//and if it does report that there is an error.
					if(config[key].hasOwnProperty('required')){
						if(this.errors[inputId] == undefined)
							this.errors[inputId] = [];
						this.errors[inputId].push(this.messages['required'].replace(':field', inputName).replace(':rule', config[key][rule]));
					}
				}
			}
		}
	}

	/*
	* Validation Methods
	*/
	
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
