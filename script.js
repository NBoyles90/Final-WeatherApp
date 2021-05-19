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
        //display variables
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
        tempMin: "" ,
        bigDegree: "",
        lilDegree: "",     
    },
    //this function is to be used many times so it could not just go into mounted because it would not beable to be called again by the button
    methods: {
        updateAPI(){
            this.link = `http://api.openweathermap.org/data/2.5/weather?zip=${this.userZip},us&units=${this.userDegree}&appid=8593489cf78cb16629c8045243ffbc9c`;
            this.useAPI();
        },
        useAPI(){
            axios.get(this.link)
                .then((response) => {
                    this.errMessage = "";
                    console.log(response.data)
                    this.temp = Math.ceil(response.data.main.temp);
                    this.city = response.data.name;
                    this.imgCode = response.data.weather[0].icon;
                    this.feels = Math.ceil(response.data.main.feels_like);
                    this.humidity = Math.ceil(response.data.main.humidity);
                    this.tempMax = Math.ceil(response.data.main.temp_max);
                    this.tempMin = Math.ceil(response.data.main.temp_min);
                    this.visDescription = response.data.weather[0].description; 
                }).catch((error) => {
                    this.errMessage = "*This is not a Valid Zipcode in the US*";
                })
        },
        validateZip(){
            try{
                if((this.userZip.length == 5)&&(this.userZip > 0)) {
                    this.errMessage = "";
                    this.updateAPI();
                }
                else{
                    this.errMessage = "*Please enter a Valid Zipcode composed of 5 digits*"
                }   
            }
            catch(err){
                alert(err)
                this.errMessage = err
            }
        },
        displayDegree(){
            console.log(this.userDegree)
            this.updateAPI()
        }
    },
    // a function that runs when the page is loaded, it calls the function useAPI to populate the information 
    mounted: function mounted() {
        this.userZip = "65807"
        this.userDegree = "imperial"
        this.validateZip()
    }
})