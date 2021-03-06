import axios from "axios";

const http = axios.create({
  baseURL: 'api/',
  headers: {
    "Content-type": "application/json"
  }
});

export default {
  auth(url = 'auth') {
    return {
        login: ({email, password}) => http.post(url + '/login', {email, password}),
        register: ({email, name, password}) => http.post(url + '/register', {email, name, password})
    }
  },

  map(url = 'map') {
      const config = {
        headers: {
          'authorization': 'Bearer ' + localStorage.getItem('token')
        }
      };

      return {
          fetchAll: () => http.get(url + '/list', config),
          fetchPagination: (page, limit) => 
              http.get(url + "?page=" + page + "&limit=" + limit, config),
          fetchById: id => http.get(url + "/" + id, config),
          create: newRecord => http.post(url, newRecord, config),
          update: (id, updatedRecord) => http.put(url + "/" + id, updatedRecord, config),
          updateStatus: (id, status) => http.put(url + "/updateStatus/" + id,status, config),
          delete: id => http.delete(url + "/" + id, config),
          downloadJSON:()=>http.get(url + "/download", {...config,responseType:"blob"})
      }
  },

  user(url = 'user') {
      const config = {
        headers: {
          'authorization': 'Bearer ' + localStorage.getItem('token')
        }
      };

      return {
          fetchAll: () => http.get(url + '/list', config),
          fetchPagination: (page, limit = 10, name = null, email = null) => 
              http.get(url + "?page=" + page + "&limit=" + limit + "&name=" + name + "&email=" + email, config),
          fetchById: id => http.get(url + "/" + id, config),
          create: newRecord => http.post(url, newRecord, config),
          update: (id, updatedRecord) => http.put(url + "/" + id, updatedRecord, config),
          delete: id => http.delete(url + "/" + id, config)
      }
  },

  farmer(url = 'farmer') {
    const config = {
      headers: {
        'authorization': 'Bearer ' + localStorage.getItem('token')
      }
    };
    return {
        fetchAll: () => http.get(url + '/list', config),
        fetchPagination: (page, limit, name, category) => 
            http.get(url + "?page=" + page + "&limit=" + limit + "&name=" + name + "&category=" + category, config),
        fetchFilteredFarmer:(page,limit,status)=> http.get(url + "?page=" + page + "&limit=" + limit + "&status=" + status , config),
        fetchById: (name,phone) => http.get(url + `/get?name=${name}&phone=${phone}`, config),
        create: newRecord => http.post(url, newRecord, config),
        update: (id, updatedRecord) => http.put(url + "/" + id, updatedRecord, config),
        delete: id => http.delete(url + "/" + id, config),
        downloadJSON:()=>http.get(url + "/download", {...config,responseType:"blob"})
    }
},
orders(url = 'orders') {
      const config = {
        headers: {
          'authorization': 'Bearer ' + localStorage.getItem('token')
        }
      };

      return {
          fetchAll: () => http.get(url + '/list', config),
          fetchPagination: (page, limit, name, category) => 
              http.get(url + "?page=" + page + "&limit=" + limit + "&name=" + name + "&category=" + category, config),
          fetchById: (name,phone) => http.get(url + `/get?name=${name}&phone=${phone}`, config),
          create: newRecord => http.post(url, newRecord, config),
          getScheduledStem: (page, limit) => http.get(url + "/scheduledStem?page=" + page +"&limit=" + limit, config),
          getFilteredStem: (page, limit,status,date) => http.post(url + "/scheduledStem?page=" + page +"&limit=" + limit,{status,date},config),
          getFilteredScheduledStem: (page, limit,status,date) => http.post(url + "/scheduledStem?page=" + page +"&limit=" + limit,{status,date,isScheduledStems:true},config),
          update: (id, updatedRecord) => http.put(url + "/" + id, updatedRecord, config),
          updateDate:(id,date) => http.post(url + "/scheduleDate" ,{id,date},config),
          delete: id => http.delete(url + "/" + id, config),
          downloadJSON:()=>http.get(url + "/download", {...config,responseType:"blob"}),
          scheduledStemDownloadJSON:()=>http.get(url + "/scheduledStem/download", {...config,responseType:"blob"})

      }
  },
  transporterData(url="transporterData"){
    const config = {
        headers: {
          'authorization': 'Bearer ' + localStorage.getItem('token')
        }
      };

      return {
          fetchAll: () => http.get(url + '/list', config),
          fetchPagination: (page, limit, name, category) => 
              http.get(url + "?page=" + page + "&limit=" + limit + "&name=" + name + "&category=" + category, config),
          fetchFreeTransporter: () => http.get(url + `/fetchFreeTransporter`, config),
          create: newRecord => http.post(url, newRecord, config),
          getScheduledData: (page, limit) => http.get(url + "?page=" + page +"&limit=" + limit, config),
          getFilteredData: (page, limit,status,date) => http.post(url + "?page=" + page +"&limit=" + limit,{status,date},config),
          update: (id, status) => http.put(url + "/" + id, status, config),
          assignNewTransporter:(id,transporter_id) => http.post(url + "/assignNewTransporter" ,{id,transporter_id},config),
          delete: id => http.delete(url + "/" + id, config),
          downloadJSON:()=>http.get(url + "/download", {...config,responseType:"blob"}),
      }
  },
  scheduler(url = 'scheduler') {
      const config = {
        headers: {
          'authorization': 'Bearer ' + localStorage.getItem('token')
        }
      };

      return {
          fetchScheduledFarmer: (page, limit) => 
              http.get(url + "/scheduledFarmer?page=" + page + "&limit=" + limit, config),
          
          fetchScheduledTransporter: (page, limit) => 
              http.get(url + "/scheduledTransporter?page=" + page + "&limit=" + limit, config),
          
          fetchNonScheduledTransporter: (page, limit) => 
              http.get(url + "/NonScheduledTransporter?page=" + page + "&limit=" + limit, config),
          
          fetchStemAvailability: (page, limit) => 
              http.get(url + "/stemAvailability?page=" + page + "&limit=" + limit, config),

          fetchInputParameter:()=>http.get(url+"/inputParameter",config),

          updateInputParameter:(data)=>http.post(url+"/inputParameter",data,config),
          
          fetchHyperParameter:()=>http.get(url+"/hyperParameter",config),

          updateHyperParameter:(data)=>http.post(url+"/hyperParameter",data,config)
      }
  },

}