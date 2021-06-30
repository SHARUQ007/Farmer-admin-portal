import axios from "axios";

const http = axios.create({
  baseURL: 'http://localhost:3000/api/',
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
          delete: id => http.delete(url + "/" + id, config)
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
        fetchById: (name,phone) => http.get(url + "/get"+"?name="+name+"&phone="+phone, config),
        create: newRecord => http.post(url, newRecord, config),
        update: (id, updatedRecord) => http.put(url + "/" + id, updatedRecord, config),
        delete: id => http.delete(url + "/" + id, config)
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
          fetchById: (name,phone) => http.get(url + "/get"+"?name="+name+"&phone="+phone, config),
          create: newRecord => http.post(url, newRecord, config),
          getScheduledStem: (page, limit) => http.get(url + "/scheduledStem?page=" + page +"&limit=" + limit, config),
          getFilteredStem: (page, limit,status,date) => http.post(url + "/scheduledStem?page=" + page +"&limit=" + limit,{status,date},config),
          getFilteredScheduledStem: (page, limit,status,date) => http.post(url + "/scheduledStem?page=" + page +"&limit=" + limit,{status,date,isScheduledStems:true},config),
          update: (id, updatedRecord) => http.put(url + "/" + id, updatedRecord, config),
          updateDate:(id,date) => http.post(url + "/scheduleDate" ,{id,date},config),
          delete: id => http.delete(url + "/" + id, config)
      }
  }

}