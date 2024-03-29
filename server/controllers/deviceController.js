const uuid = require('uuid');
const path = require('path');
const { Device, DeviceInfo } = require('../models/models');
const ApiError = require('../error/ApiError');
const sequelize = require('../db');

class DeviceController {
  async create(req, res, next) {
    try {
      let { name, price, brandId, typeId, info } = req.body;
      const { img } = req.files;
      let fileName = uuid.v4() + '.jpg';
      img.mv(path.resolve(__dirname, '..', 'static', fileName));

      const device = await Device.create({
        name,
        price,
        brandId,
        typeId,
        img: fileName,
      });

      if (info) {
        info = JSON.parse(info);
        info.forEach((i) =>
          DeviceInfo.create({
            title: i.title,
            description: i.description,
            deviceId: device.id,
          }),
        );
      }

      return res.json(device);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    try {
      let { brandId, typeId, limit, page } = req.query;
      // page = page || 1;

      // ---------- Здесь есть ошибка с выводом записей по лимиту! Я поставил && чтобы записи выводились хотя бы. ---------- //
      // limit = limit && 9;

      // let offset = page * limit - limit;
      let devices;
      if (!brandId && !typeId) {
        devices = await Device.findAndCountAll({
          // limit,
          // offset,
          include: [{ model: DeviceInfo, as: 'info' }],
        });
      }
      if (brandId && !typeId) {
        devices = await Device.findAndCountAll({
          where: { brandId },
          // limit,
          // offset,
        });
      }
      if (!brandId && typeId) {
        devices = await Device.findAndCountAll({
          where: { typeId },
          // limit,
          // offset,
        });
      }
      if (brandId && typeId) {
        devices = await Device.findAndCountAll({
          where: { typeId, brandId },
          // limit,
          // offset,
        });
      }
      return res.json(devices);
    } catch (e) {
      console.log(e);
    }
  }

  async getOne(req, res) {
    const { id } = req.params;
    const device = await Device.findOne({
      where: { id },
      include: [{ model: DeviceInfo, as: 'info' }],
    });
    return res.json(device);
  }

  async deleteOne(req, res) {
    const { id } = req.query;
    const device = await Device.findOne({
      where: { id },
      include: [{ model: DeviceInfo, as: 'info' }],
    });
    await device.destroy();
    // await sequelize.query(`DELETE FROM device_infos WHERE deviceId = ${id}`);
    // await sequelize.query(`DELETE FROM devices WHERE id = ${id}`);
    console.log(id);

    return res.json(id);
  }
}

module.exports = new DeviceController();
