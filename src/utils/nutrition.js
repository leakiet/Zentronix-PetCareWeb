export const calcCustomTotal = (selected) => {
  let total = { calories: 0, protein: 0, carbs: 0, fat: 0 }
  Object.keys(selected).forEach(type => {
    selected[type].forEach(item => {
      total.calories += (item.calories || 0) * (item.quantity || 1)
      total.protein += (item.protein || 0) * (item.quantity || 1)
      total.carbs += (item.carbs || 0) * (item.quantity || 1)
      total.fat += (item.fat || 0) * (item.quantity || 1)
    })
  })
  return total
}

export const getSuggestedMeals = (customTotal, mealPackages) => {
  return mealPackages
    .map(meal => {
      const match = meal.nutritionalInfo?.match(/Calories: (\d+)kcal, Protein: (\d+)g, Carbs: (\d+)g, Fat: (\d+)g/)
      if (!match) return { ...meal, diff: 9999 }
      const [cal, pro, carb, fat] = match
      const diff = Math.abs(customTotal.calories - cal) + Math.abs(customTotal.protein - pro) + Math.abs(customTotal.carbs - carb) + Math.abs(customTotal.fat - fat)
      return { ...meal, diff }
    })
    .sort((a, b) => a.diff - b.diff)
    .slice(0, 3)
}