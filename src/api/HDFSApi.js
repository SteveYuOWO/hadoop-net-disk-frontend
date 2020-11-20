import http from '../tools/http.js'

let diskTransfer = (size) => {
    if(size > 1000) {
        size = parseInt(size / 1000)
        if(size > 1000) {
            size = parseInt(size / 1000)
            if(size > 1000) {
                size = parseInt(size / 1000)
                if(size > 1000) {
                    size = parseInt(size / 1000)
                    size += 'TB'
                } else size += 'GB'
            } else size += 'MB'
        } else size += 'KB'
    } else size += ' B'
    return size
}

let list = async (path) => {
    let ret = ''
    await http.get('hadoop/list', {
        params: {
            path: '/' + JSON.parse(localStorage.getItem('user')).course.id
        }
    }).then(res => {
        ret = res.data
        ret.forEach((element, index) => {
            element.key = index
            element.size = diskTransfer(element.size)
            let lastModiDate = new Date(element.lastModificationTime)
            element.lastModificationTime = lastModiDate.getFullYear() + '-' + lastModiDate.getMonth() + '-' + lastModiDate.getDate()
        })
    })
    return ret
}

let upload = async (file, path) => {
    const data = new FormData()
    data.append('file', file)
    var ret = ''
    let courseId = JSON.parse(localStorage.getItem('user')).course.id

    let arr = path.split('\\')
    let filename = arr[arr.length - 1]
   

    console.log(data)

    await http.post('hadoop/upload/' + courseId + '/' + filename, data, {
        headers: {'Content-Type': 'multipart/form-data'}
    }).then((res) => {
        ret = res.data
    }).catch((err) => {
        ret = err.message
    })
    return ret
}

let urlTransformer = (path) => {
    let arr = path.split('/')
    var newPath = ''
    for(let i = 3; i < arr.length; i++) {
        newPath += '/'
        newPath += arr[i]
    }
    return newPath
}

let download = async (path) => {
    path = urlTransformer(path)
    let ret = ''
    await http.get('hadoop/download', {
        params: {
            path: path
        }
    }).then(res => {
        ret = res.data
    })
    return ret
}

let deleteFile = async (path) => {
    let ret = ''
    await http.delete('hadoop', {
        params: {
            path: path
        }
    }).then(res => {
        ret = res.data
    })
    return ret
}

export const HDFSApi = {
    upload: upload,
    download: download,
    list: list,
    urlTransformer: urlTransformer,
    deleteFile: deleteFile,
}