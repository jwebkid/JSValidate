JavaScript Validator
===========

This is a small JavaScript class which helps front end developers to validate their forms. This class is still in its early stages! Please participate in creating more validation methods and messages!

##Getting Started
###Installing
Download Validator.js and refernce it into your HTML. Once this is done you will be able to make use of the functionality which `Validate` object offers. 
`<script src="Validator.js"></script>`

The first thing that you need to do before you can start using `Validate` is to create a JSON object containing rules which different input elements must follow:

    var obj = {
        "username": {
            "required": true,
            "min": 5,
            "max": 10
        },
        "email": {
            "required": true,
            "email": true
        }
    }
    
The above JSON file is targetting input elements which have their id attribtue set to ' `username` and `email`. Once the rules has been set, its time to make use of the `Validate` class and assign it with the above rules.

    //Creation of Validate
    var val = new Validate(obj);
    //Execution of Validate
    val->exec();
    
At this point the `Validate` class has validated all the input attributes referenced in the `obj` JSON file. In order to check whether the validation has passed or failed, use the following methods:

    //Check whether the validation has passed:
    $val->passes();
    
    //Check whether the validation has failed:
    $val->fails();
    
    //To get the list of errors:
    $val->errors();
    
Errors will be returneed in a JSON format:

    {
        "username": [
            "username field needs to be at least 5 characters long.",
            "username is required."
        ]
    }
    
By default `Validator` takes the id of the field name to output the error messages. There are times that the id would be very difficult for an untechnical user visiting the the site to know what field is giving the error. For this reason if you want to refer to a particular filed with a custom name all you need to do is to alter the rules JSON object:

     var obj = {
        "username|Customer Field Name": {
            "required": true,
            "min": 5,
            "max": 10
        },
        "email": {
            "required": true,
            "email": true
        }
    }
    
//This will result in the following error object:

    {
        "username": [
            "Customer Field Name field needs to be at least 5 characters long.",
            "Customer Field Name is required."
        ]
    }
    
##Configure & Extend
With `Validate` you will be able to add you own custom validation methods and messages. In order to do so open the `Validate` JavaScript file and add a method to the class itself with two parameters and that returns a boolean value:

    //This is an example of a method
    /*
    * @param value | This is the value of the Input Attribtue
    * @param rule This is the rule value, in the above example the min value is 5.
    */
    this.min = function(value, rule){
        return value.length >= rule;
    }
    
You will also need to define an Error message to be shown when the validation of your method Configure the `this.message` JSON Object in the `Validate` class. It is important that the key of the message is the same as the name of his method.

    this.messages = {
		"email": ":field must be a valid email address.",
		"regex": ":field format is invalid."
		...
		"min": ":field field needs to be at least :rule characters long.",
	}
	
The `:field` will be displaying the element id or custom name given by the developer while the `:rule` will be showing the expected value.
