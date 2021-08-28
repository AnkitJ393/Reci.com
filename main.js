'use strict'
let d=document;
const searchBtn=d.querySelector('.search-btn');
const  mealList=d.getElementById('meal');
const  mealDetailContent=d.querySelector('.meal-details-content');
const  recipeCloseBtn=d.querySelector('.btn-recipe-close-btn');
const mealidContainer=d.querySelector('.mealidcontainer');
const YourSearch=d.querySelector(".meal-result-title");

recipeCloseBtn.addEventListener('click',()=>{
    mealDetailContent.parentElement.classList.remove('showRecipe');
})


async function getMealList(){
    let input=d.getElementById('search-input').value.trim();
    try{
        let fetchAPi=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${input}`)
        let response=await fetchAPi.json();
        console.log( response.meals)

        let html="";
        if(response.meals){
            YourSearch.textContent="Your Search results :";
            response.meals.forEach(element => {
                html+=`
                    <div class="dish" data-id="${element.idMeal}">
                    <div class="meal-img">
                    <img
                        src="${element.strMealThumb}"
                        alt="food"
                    />
                    </div>
                    <div class="meal-name">
                    <h3>${element.strMeal}</h3>
                    <a href="#" class="recipe-btn">Get Recipe</a>
                    </div>
                </div>
                
                
                `

            });
            mealidContainer.classList.remove('notfind');
        }
        else{
            html=`<p>Sorry , we didn't find any Meal.You Can Search Something else 😊</p>`
            mealidContainer.classList.add('notfind');
            YourSearch.textContent=""
        }
        mealidContainer.innerHTML=html;
    }catch(e){
        console.log(e);
    }
    // let data=await response;
}

function mealReacipeMode(meal){
    let mealdetailhtml='';
    let meals=meal[0];
    // console.log(meals);
    mealdetailhtml=`
            <h2 class="recipe-title">${meals.strMeal}</h2>
            <p class="recipe-category">${meals.strCategory}</p>

            <div class="recipe-instruct">
            <h3>INSTRUCTIONS:</h3>
            <p>
                ${meals.strInstructions}
            </p>
            </div>
            <div class="recipe-meal-img">
            <img
                src="${meals.strMealThumb}"
                alt="food"
            />
            </div>
            <div class="recipe-link">
            <a href="${meals.strYoutube}" target="_blank">Watch Video</a>
            </div>

    
    `
    console.log(mealDetailContent.parentElement)
    mealDetailContent.innerHTML=mealdetailhtml;
    mealDetailContent.parentElement.classList.add('showRecipe');


}

function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem=e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response=>response.json())
        .then(data=>{
            mealReacipeMode(data.meals);
        })
    }
}


searchBtn.addEventListener('click',getMealList);
mealList.addEventListener('click',getMealRecipe);

window.addEventListener('keydown',(e)=>{
    if(e.key==='Enter'){
        searchBtn.click();
    }
})



// fetch(' https://jsonplaceholder.typicode.com/posts/1') .then(function(response) { // The response is a Response instance. // You parse the data into a useable format using `.json()` return response.json(); }).then(function(data) { // `data` is the parsed version of the JSON returned from the above endpoint. console.log(data); // { "userId": 1, "id": 1, "title": "...", "body": "..." } });
