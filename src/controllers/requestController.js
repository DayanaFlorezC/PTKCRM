const {Request} = require('../models/request')

const createRequest = async (req, res) => {
    try {
        const requestNew = {
            ...req.body,
            fechaSolicitud: new Date()
        }

        const request = await Request.create(requestNew)

        res.json(request)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
}


const getRequests = async (req, res) => {
    try {
        const limit = +req.query?.limit || 5
        const page = +req.query?.page || 1

        const { count, rows: solicitudes } = await Request.findAndCountAll({
            limit: limit,
            offset: (page-1)*limit
        });

        res.json({solicitudes, count})
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
}

const getRequestById = async (req, res) => {

    try {
        const solicitud = await Request.findByPk(req.params.id)

        res.json(solicitud)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }

}

const getRequestByUser = async (req, res) =>{
    try {

        const limit = +req.query?.limit || 5
        const page = +req.query?.page || 1
        
        const { count, rows: solicitudes } = await Request.findAndCountAll({
            where: { id_empleado: req.params.userId },
            include: [User],
            limit: limit,
            offset: (page-1)*limit 
        });

        res.json({solicitudes, count})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
}

const deleteRequest = async  (req, res) =>{

    const request = await Request.findByPk(req.params.id)

    if(!request) return res.status(404).json({ message: 'Solicitud no encontrada' });

    request.destroy()

    res.json({ message: 'Solicitud eliminada', solicitud: request })

}
module.exports = {
    createRequest,
    getRequests,
    getRequestById,
    getRequestByUser,
    deleteRequest
}