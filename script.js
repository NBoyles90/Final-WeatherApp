// Author: Nikki Collins
// Date: 05/15
// Project: Current Weather (Final)
// Purpose: You will create a page where a user can enter a zip code and choose between Celsius or Fahrenheit. The page will return the current temperature, current conditions and city. You may assume for this assignment that your page only accepts US zip codes.
var app = new Vue({
    //the element app, the scope of where vue can be used
    el: "#app",
    //global variables that can be used anywhere on the html
    data: {
        link: "",
        //display variables - 
        userZip: "",
        userDegree: "",
        temp: "",
        city: "",
        imgCode: "",
        imgConditions: "",
        visDescription: "",
        errMessage: "",
        feels: "",
        humidity: "",
        tempMax: "",
        tempMin: ""  
    },
    //this function is to be used many times so it could not just go into mounted because it would not beable to be called again by the button
    methods: {
        updateAPI(){
            //creates the link to use and update when the user inputs data
            this.link = `http://api.openweathermap.org/data/2.5/weather?zip=${this.userZip},us&units=${this.userDegree}&appid=8593489cf78cb16629c8045243ffbc9c`;
            this.useAPI();
        },
        useAPI(){
            //does all the hard work for us, gets the data, packages it up into usable object from json and confirms vailid response
            axios.get(this.link)
                .then((response) => {
                    //empties the message variable
                    this.errMessage = "";
                    //gathers all the information for the variables to be filled and placed in the HTML
                    console.log(response.data)
                    this.temp = Math.ceil(response.data.main.temp);
                    this.city = response.data.name;
                    this.imgCode = response.data.weather[0].icon;
                    this.feels = Math.ceil(response.data.main.feels_like);
                    this.humidity = Math.ceil(response.data.main.humidity);
                    this.tempMax = Math.ceil(response.data.main.temp_max);
                    this.tempMin = Math.ceil(response.data.main.temp_min);
                    this.visDescription = response.data.weather[0].description; 
                    //catches the error if the user enters a zip that is not available in the API 
                    //prints instructions to enter a valid zipcode
                }).catch((error) => {
                    this.errMessage = "*This is not a Valid Zipcode in the US*";
                })
        },
        validateZip(){
            //only allows the user to enter 5 characters and they have to be greater than 0 so it ensures no Alpha characters
            if((this.userZip.length == 5)&&(this.userZip > 0)) {
                //empties the message variable
                this.errMessage = "";
                this.updateAPI();
            }
            else{
                //catches the error if the user's text does not meet the conditions in the if statement
                this.errMessage = "*Please enter a Valid Zipcode composed of 5 digits*"
            }             
        },
        //is called when user clicks on the unit of measurement (f/c) and updates the userDegree with the values returned
        displayDegree(){
            console.log(this.userDegree)
            this.updateAPI()
        }
    },
    // a function that runs when the page is loaded, it calls the function useAPI to populate the information 
    mounted: function mounted() {
        //starter information for when the page first loads
        this.userZip = "65807"
        this.userDegree = "imperial"
        this.validateZip()
    }
})