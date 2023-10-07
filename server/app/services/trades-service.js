import trades from "../models/trades-model.js";


export const save = async (newTrade) => {
        const createTrade = new have(newTrade);
        return createTrade.save();
}


export const getCollection = async function getTrade(id) {
    try{
        const tradeData = await trades.findById(id);
        return tradeData;
    } catch (err) {
        console.error(`Error: ${err}`);
      } 
        return tradeData;
}


export const getAllCollections = async function getTradesCollection() {    
    try {
        const data = await trades.find()
        const tradeFromDb = { trade: data }; 
        return tradeFromDb;
} catch (err) {
  console.error(`Error: ${err}`);
} 
}

// export const get = async (id) => {
// const tradeGet = trades.find();
// return tradeGet;
// }

export const remove = async (id) => {
const tradeRemove = trades.findByIdAndDelete(id).exec();
return tradeRemove;
}

// export const search = async (params) => {
// const tradeSearch = trades.find(params).exec();
// return tradeSearch;
// }

// export const getHaveDetails = async (haveId) => {
//   try {
//       const have1 = await trades.findOne({ haveid: haveId }).populate('serviceID').populate('userId').populate("goodID");
//       if (!have1) {
//           return null;
//       }
//       return have1;
//   } catch (error) {
//       console.error(error);
//       return null;
//   }
// }
