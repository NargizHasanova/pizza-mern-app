import Pizza from "../models/Pizza.js";


// createPizza
export const createPizza = async (req, res) => {
    try {
        const newPizza = new Pizza(req.body)

        const savedPizza = await newPizza.save()
        res.status(201).json(savedPizza)

    } catch (err) {
        res.status(404).json(err.message)
    }
}

// getPizzas
export const getPizzas = async (req, res) => {
    const { page } = req.query;

    try {
        const LIMIT = 6;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

        const total = await Pizza.countDocuments({});
        const pizzas = await Pizza.find().limit(LIMIT).skip(startIndex);
        // limit means limit qeder posts qaytar
        // skipde deyirki meselen 2ci seyfedesense ancaq 2nin postlarini goster daha 1den baslama
        res.json(
            {
                pizzas: pizzas,
                currentPage: Number(page),
                numberOfPages: Math.ceil(total / LIMIT)
            }
        );
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


// getPizzasByCategory
export const getPizzasByCategory = async (req, res) => {
    const cat = req.query.cat
    console.log(cat);

    try {

        let pizzas
        pizzas = await Pizza.find({ category: cat })
        if (pizzas.length === 0) {
            pizzas = await Pizza.find()
        }
        console.log(pizzas);

        res.json(pizzas);
    } catch (error) {
        res.status(404).json(error.message);
    }
}


// getPizzasBySearch
export const getPizzasBySearch = async (req, res) => {
    const { searchQuery } = req.query;

    try {
        //bunu yazanda axtarisda "me" versek bele "merni" tapacaq
        const pizzaName = new RegExp(searchQuery, "i"); // registr sensitive

        const pizzas = await Pizza.find({ name: pizzaName });// hansi yazilan tagi include edirse butun o postlari qaytaracaq(ancaq birinci tapdigini yox)

        res.json(pizzas);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

