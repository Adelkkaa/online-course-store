const { Device, BasketDevice, Basket } = require("../models/models");
const sequelize = require("../db");

class BasketController {
  // ------ CRUD корзины ------ //

  async addtoBasket(req, res, next) {
    const user = req.user;
    const { deviceId } = req.body;
    const basket = await BasketDevice.create({
      basketId: user.id,
      deviceId: deviceId,
    });
    return res.json(basket);
  }

  async getBasketUser(req, res) {
    const { id } = req.user;
    const basket = await BasketDevice.findAll({
      include: {
        model: Device,
      },
      where: { basketId: id },
    });

    return res.json(basket);
  }

  // Добавляем логику удаление из корзины

  async deleteOneBasketItem(req, res) {
    const { id } = req.query;
    const post = await sequelize.query(
      `DELETE FROM basket_devices WHERE id = ${id}`
    );
    return res.json("Was deleted");
  }
}

module.exports = new BasketController();
