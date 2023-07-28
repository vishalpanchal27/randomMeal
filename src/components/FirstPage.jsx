import { useState } from "react"
import React from "react"
import "./FirstPage.css"
export default function FirstPage() {
    const [height, setheight] = useState("100vh")
    const [meal, setmeal] = useState("null")
    const [click, setClick] = useState(false)
    const [hidden, setHidden] = useState("hidden")
    const toSwitchOnSecondPage = () => {
        setmeal(null)
        setheight("20px")
        fetch('https://www.themealdb.com/api/json/v1/1/random.php')
            .then(res => res.json())
            .then(res => {
                createMeal(res.meals[0]);
            });
        setHidden("visible")
        setClick(true)
    }
    const createMeal = (meal) => {
        const ingredients = [];
        for (let i = 0; i <= 20; i++) {
            if (meal[`strIngredient${i}`]) {
                ingredients.push(`${meal[`strIngredient${i}`]}-${meal[`strMeasure${i}`]}`)
            }
        }
        const ingredient = ingredients.map(ingred => ingred);
        console.log(ingredient)
        setmeal({ ...meal, ingredients })
    }
    const handleOnChange = (e) => {
        return (e.target.value)
    }
    return (
        <>
            <div className="mainContainer" style={{ overflow: click === false ? "hidden" : "visible" }} >

                < main style={{ height: height }} >
                    <div id="firstPage">
                        <h2>Feeling Hungry?</h2>
                        <h3>Get a random meal by clicking below</h3>
                        <button id="GetMeal" onClick={toSwitchOnSecondPage} onChange={handleOnChange} >Get Meal</button>
                    </div>
                </main>
                {meal &&
                    <section style={{ height: height === "20px" ? "75vh" : "1px", visibility: hidden }}>
                        <div className="secondContainer" >
                            <div className="image">
                                <img src={`${meal.strMealThumb}`} alt="" />
                            </div>
                            <div className="ingredients" >
                                <h3>Ingredients</h3>
                                {meal.ingredients && (
                                    <ul>
                                        {meal.ingredients.map((ingred) =>
                                            <li key={meal.idMeal}>{ingred}</li>)}
                                    </ul>
                                )}
                            </div>
                            <div className="recipe">
                                <h3>Recipe</h3>
                                <p>{meal.strInstructions && meal.strInstructions.slice(0, 500)}</p>
                            </div>
                            <div className="recipeVideo">
                                {/* <h3>Recipe Video</h3> */}
                                {meal.strYoutube &&
                                    <iframe controls
                                        title={meal.strYoutube}
                                        id="youtubeVideo"
                                        src={`https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}`}
                                    >
                                    </iframe>
                                }
                            </div>
                        </div>
                    </section >
                }
            </div>
        </>
    )
}