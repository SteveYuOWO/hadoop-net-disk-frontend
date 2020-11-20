import http from '../tools/http.js'

let loginStudent = async (student) => {
    var data = ''
    await http.post('login/student', student).then(res => {
        data = res
    })
    if(data.data === '') return {
        status: 'error',
        info: '用户名或密码错误'
    } 
    else {
        localStorage.setItem('user', JSON.stringify(data.data))
        localStorage.setItem('type', 'student')
        return {
            status: 'success',
            info: '登录成功'
        }
    }
}

let loginTeacher = async (teacher) => {
    var data = ''
    await http.post('login/teacher', teacher).then(res => {
        data = res
    })
    if(data.data === '') return {
        status: 'error',
        info: '用户名或密码错误'
    } 
    else {
        localStorage.setItem('user', JSON.stringify(data.data))
        localStorage.setItem('type', 'teacher')
        return {
            status: 'success',
            info: '登录成功'
        }
    }
}

let loginAdmin = async (admin) => {
    var data = ''
    await http.post('login/admin', admin).then(res => {
        data = res
    })
    if(data.data === '') return {
        status: 'error',
        info: '用户名或密码错误'
    } 
    else {
        localStorage.setItem('user', JSON.stringify(data.data))
        localStorage.setItem('type', 'admin')
        return {
            status: 'success',
            info: '登录成功'
        }
    }
}

export const LoginApi = {
    loginStudent: loginStudent,
    loginTeacher: loginTeacher,
    loginAdmin: loginAdmin
}