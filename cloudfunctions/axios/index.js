// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
const axios = require('axios')
exports.main = async (event, context) => {
  const url = event.url
  delete event.url
  try {
    const res = await axios.get(url, {
      params: event
    })
    return res.data; 
  } catch (e) {
    console.error(e);
    return e;
  }
}