export const validaPetsMid = (req, res, next) => {
  try {
    const bodyPet = req.body;

    let msgError = [];

    if (!bodyPet.name) {
      msgError.push("name é obrigatório");
    }
    if (!bodyPet.breed) {
      msgError.push("breed é obrigatório");
    }
    if (!bodyPet.age) {
      msgError.push("age é obrigatório");
    }
    if (!bodyPet.type) {
      msgError.push("type é obrigatório");
    }

    if (msgError.length > 0) {
      return res.status(400).json({
        ok : false,
        message : msgError.join(", ")
      })
    }

    next();

  } catch (error) {
    res.status(500).json({
      ok : false,
      message: error.toString()
    })
  }
}
