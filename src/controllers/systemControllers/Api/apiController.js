const controller = {}
const { json } = require('express');
const connection = require('../../../database')

/* global actions */
controller.getProducts = async(req, res)=>{
    const products = await connection.query(`select * from productos`)
    res.json(products)
}
/* /global actions */

/* waiter actions */
controller.getWaiterOrderDetail = async(req, res)=>{
    const {id} = req.params;
    const orderProducts = await connection.query(`SELECT ppl.num, ppl.fk_pedidolocal, p.nombre,p.precio_venta,ppl.cantidad, ppl.estatus, (p.precio_venta*ppl.cantidad) AS total FROM productospedidolocal ppl, productos p 
    WHERE ppl.fk_pedidolocal = ${id} && ppl.fk_producto = p.id`)
    res.json(orderProducts)
}
controller.orderNewProduct = async (req, res)=>{
    const {fk_pedidolocal} = req.params;
    const {fk_producto, cantidad} = req.body;
    const newProduct = {fk_pedidolocal,fk_producto,cantidad,estatus:'Captura'}

    try {
        await connection.query('insert into productospedidolocal set ?',[newProduct])
        res.json({estatus: "ok"})
    } catch (error) {
        res.json({estatus: "wrong"})
        console.log(error)  
    }
} 
controller.deleteOrderProduct = async(req, res)=>{
    const {num} = req.params;
    try {
        await connection.query('delete from productospedidolocal where num = ?',[num])
        res.json({status:"ok"})
    } catch (error) {
        res.json({status: "wrong"})
        console.log(error)
    }
}
controller.changeCuantityProduct = async(req, res)=>{
    const {num} = req.params;
    const { cuantity }= req.body;
    try {
        await connection.query('update productospedidolocal set cantidad = ? where num = ?',[cuantity, num])
        res.json({status:"ok"})
    } catch (error) {
        res.json({status: "wrong"})
        console.log(error)
    }
}
controller.sendOrderToChef = async (req, res)=>{
    const { id } = req.params;
    try {
        await connection.query(`update pedidolocal set estatus = 'Preparacion' where id = ? `,[id])
        await connection.query(`update productospedidolocal set estatus = 'Preparacion' where fk_pedidolocal = ? && estatus != 'Preparado'`,[id])
        res.json({status:"ok"})
    } catch (error) {
        res.json({status: "wrong"})
        console.log(error)
    }
}

/* /waiter actions */

/* chef actions */
controller.chefFinishLocalOrder = async(req, res)=>{
    const {id}= req.params
    try {
        await connection.query(`update pedidolocal set estatus = 'Preparado' where id = ?`,[id])
        await connection.query(`update productospedidolocal ppl, productos p set ppl.estatus = 'Preparado' WHERE ppl.fk_pedidolocal = ? AND ppl.fk_producto = p.id && p.fk_categoria = 2;`,[id])
        res.json({status:"ok"})
    } catch (error) {
        res.json({status: "wrong"})
        console.log(error)
    }
}
controller.getChefLocalOrderDetail = async(req, res)=>{
    const {id} = req.params;
    const orderProducts = await connection.query(`SELECT ppl.num, ppl.fk_pedidolocal, p.nombre,p.precio_venta,ppl.cantidad, ppl.estatus, (p.precio_venta*ppl.cantidad) AS total FROM productospedidolocal ppl, productos p 
    WHERE ppl.fk_pedidolocal = ${id} && ppl.fk_producto = p.id && ppl.estatus='Preparacion' && p.fk_categoria = 2;`)
    res.json(orderProducts)
}

controller.chefFinishOnlineOrder = async(req, res)=>{
    const {id}= req.params
    try {
        await connection.query(`update pedidolinea set estatus = 'Preparado' where id = ?`,[id])
        await connection.query(`update productospedidolinea ppl, productos p set ppl.estatus = 'Preparado' WHERE ppl.fk_pedidolinea = ? AND ppl.fk_producto = p.id && p.fk_categoria = 2;`,[id])
        res.json({status:"ok"})
    } catch (error) {
        res.json({status: "wrong"})
        console.log(error)
    }
}
controller.getChefOnlineOrderDetail = async(req, res)=>{
    const {id} = req.params;
    const orderProducts = await connection.query(`SELECT ppl.num, ppl.fk_pedidolinea, p.nombre,p.precio_venta,ppl.cantidad, ppl.estatus, (p.precio_venta*ppl.cantidad) AS total FROM productospedidolinea ppl, productos p 
    WHERE ppl.fk_pedidolinea = ${id} && ppl.fk_producto = p.id && ppl.estatus='Preparacion' && p.fk_categoria = 2;`)
    res.json(orderProducts)
}
/* /chef actions */

/* barman actions */
controller.barmanFinishLocalOrder = async(req, res)=>{
    const {id}= req.params
    try {
        await connection.query(`update pedidolocal set estatus = 'Preparado' where id = ?`,[id])
        await connection.query(`update productospedidolocal ppl, productos p set ppl.estatus = 'Preparado' WHERE ppl.fk_pedidolocal = ? AND ppl.fk_producto = p.id && p.fk_categoria = 1;`,[id])
        res.json({status:"ok"})
    } catch (error) {
        res.json({status: "wrong"})
        console.log(error)
    }
}
controller.getBarmanLocalOrderDetail = async(req, res)=>{
    const {id} = req.params;
    const orderProducts = await connection.query(`SELECT ppl.num, ppl.fk_pedidolocal, p.nombre,p.precio_venta,ppl.cantidad, ppl.estatus, (p.precio_venta*ppl.cantidad) AS total FROM productospedidolocal ppl, productos p 
    WHERE ppl.fk_pedidolocal = ${id} && ppl.fk_producto = p.id && ppl.estatus='Preparacion' && p.fk_categoria = 1;`)
    res.json(orderProducts)
}
controller.barmanFinishOnlineOrder = async(req, res)=>{
    const {id}= req.params
    try {
        await connection.query(`update pedidolinea set estatus = 'Preparado' where id = ?`,[id])
        await connection.query(`update productospedidolinea ppl, productos p set ppl.estatus = 'Preparado' WHERE ppl.fk_pedidolinea = ? AND ppl.fk_producto = p.id && p.fk_categoria = 1;`,[id])
        res.json({status:"ok"})
    } catch (error) {
        res.json({status: "wrong"})
        console.log(error)
    }
}
controller.getBarmanOnlineOrderDetail = async(req, res)=>{
    const {id} = req.params;
    const orderProducts = await connection.query(`SELECT ppl.num, ppl.fk_pedidolinea, p.nombre,p.precio_venta,ppl.cantidad, ppl.estatus, (p.precio_venta*ppl.cantidad) AS total FROM productospedidolinea ppl, productos p 
    WHERE ppl.fk_pedidolinea = ${id} && ppl.fk_producto = p.id && ppl.estatus='Preparacion' && p.fk_categoria = 1;`)
    res.json(orderProducts)
}
/* /barman actions */

//client api actions
controller.ClientAddProductToOrder = async(req, res)=>{
    const { productid, cuantity } = req.params;
    if(cuantity > 10){
        res.json({status: "cuantityExceding"})
        return
    }
    let fkPedido;
    try {
        const car = await connection.query(`select * from pedidolinea where fk_cliente = ? && estatus = 'Captura'`,[req.user.id])
        if(car.length > 0){
            fkPedido = car[0].id
            const productInCar = await connection.query(`select * from productospedidolinea where fk_producto = ? && fk_pedidolinea = ? && estatus = 'Captura'`,[productid,fkPedido])
            if(productInCar.length > 0){
                let currentCuantity = productInCar[0].cantidad;
                let newCuantity = parseFloat(currentCuantity)+parseFloat(cuantity)
                if(parseFloat(currentCuantity)+parseFloat(newCuantity) >= 10){
                    await connection.query(`update productospedidolinea set cantidad = 10 where fk_pedidolinea = ? && fk_producto = ?`,[fkPedido, productid])
                    res.json({status:"ok"})
                }else{
                    await connection.query(`update productospedidolinea set cantidad = ? where fk_pedidolinea = ? && fk_producto = ?`,[newCuantity,fkPedido, productid])
                    res.json({status:"ok"})
                }
                
            }else{
                await connection.query(`insert into productospedidolinea values(null, ?, ?,?,'Captura')`,[fkPedido,productid,cuantity])
                console.log("ya existe un carrito")
                res.json({status:"ok"})
            }
        }else{
            await connection.query(`insert into pedidolinea values (null, ?,0,'Captura')`, [req.user.id])
            const car = await connection.query(`select * from pedidolinea where fk_cliente = ? && estatus = 'Captura'`,[req.user.id])
            fkPedido = car[0].id
            await connection.query(`insert into productospedidolinea values(null, ?, ?,?,'Captura')`,[fkPedido,productid,cuantity])
            console.log("aun no existe un carrito, se creo")
            res.json({status:"ok"})
        }
    } catch (error) {
        res.json({status: "wrong"})
        console.log(error)
    }
}
controller.getClientProducts = async(req, res)=>{
    try {
        const idPedido = await connection.query(`select id from pedidolinea where fk_cliente = ? && estatus = 'Captura'`,[req.user.id])
        if(idPedido.length > 0){
            const clientProducts = await connection.query(`SELECT ppl.num, p.nombre, p.imagen, p.precio_venta, ppl.cantidad, (p.precio_venta*ppl.cantidad) AS total, ppl.estatus FROM productospedidolinea ppl, productos p WHERE p.id = ppl.fk_producto && ppl.fk_pedidolinea = ? && estatus = 'Captura'`,[idPedido[0].id])
            res.json(clientProducts)
        }else{
            res.json([])
        } 
    } catch (error) {
        res.json({status: "wrong"})
        console.log(error) 
    }
}
controller.clientChangeProductCuantity = async(req, res)=>{
    const { num, cuantity } = req.params;
    try {
        const idPedido = await connection.query(`select id from pedidolinea where fk_cliente = ? && estatus = 'Captura'`,[req.user.id])
        await connection.query('update productospedidolinea set cantidad = ? where num = ? ',[cuantity, num])
        const cuantityChanged = await connection.query('select cantidad from productospedidolinea where num = ? && fk_pedidolinea = ?',[num,idPedido[0].id])
        res.json({status: "ok",cuantityChanged})

    } catch (error) {
        res.json({status: "wrong"})
        console.log(error)
    }
}
controller.clientRemoveProductFromOrder = async(req,res)=>{
    const {num} = req.params
    try {
        const idPedido = await connection.query(`select id from pedidolinea where fk_cliente = ? && estatus = 'Captura'`,[req.user.id])
        await connection.query('delete from productospedidolinea where num = ? && fk_pedidolinea = ?', [num,idPedido[0].id])
        res.json({status: "ok"})
    } catch (error) {
        res.json({status: "wrong"})
        console.log(error)
    }
}

controller.clientConfirmOrder = async (req, res)=>{
    try {
        const idPedido = await connection.query(`select id from pedidolinea where fk_cliente = ? && estatus = 'Captura'`,[req.user.id])
        const pedidoTotal = await connection.query(`SELECT SUM(p.precio_venta*ppl.cantidad) AS Total FROM productospedidolinea ppl, productos p WHERE ppl.fk_pedidolinea = ? && p.id = ppl.fk_producto;`,[idPedido[0].id])
        await connection.query(`update pedidolinea set totalPedido = ?, estatus = 'Preparacion' where id = ?`,[pedidoTotal[0].Total,idPedido[0].id])
        await connection.query(`update productospedidolinea set estatus = 'Preparacion' where fk_pedidolinea = ?`,[idPedido[0].id])
        
        res.json({status: "ok"})
    } catch (error) {
        res.json({status: "wrong"})
        console.log(error) 
    }
}

controller.clientGetAllOrders = async (req, res)=>{
    try {
        const clientOrders = await connection.query(`select * from pedidolinea where fk_cliente = ? && estatus != 'Captura'`,[req.user.id])
        res.json(clientOrders)
    } catch (error) {
        res.json({status: "wrong"})
        console.log(error) 
    }
}
controller.getClientDetailOrder = async(req, res)=>{
    const {id} = req.params;
    try {
        const orderDetail = await connection.query(`SELECT ppl.num, p.nombre, p.imagen, p.precio_venta, ppl.cantidad, (p.precio_venta*ppl.cantidad) AS total, ppl.estatus FROM productospedidolinea ppl, productos p WHERE p.id = ppl.fk_producto && ppl.fk_pedidolinea = ?`,[id])
        res.json(orderDetail)
    } catch (error) {
        res.json({status: "wrong"})
        console.log(error) 
    }
}

//tradesman
controller.TradesmanGetPreparedOrders = async (req, res)=>{
    try {
        const preparedOrders = await connection.query(`select pl.id, u.id As userid, u.nombre, u.direccion, u.telefono, pl.fk_cliente, pl.estatus from pedidolinea pl, usuarios u where pl.fk_cliente = u.id && pl.estatus = 'Preparado' || pl.fk_cliente = u.id && pl.estatus = 'Entrega'`)
        res.json(preparedOrders)
    } catch (error) {
        res.json({status: "wrong"})
        console.log(error) 
    }
}
controller.TradesManGetDetails = async (req, res)=>{
    const { id } = req.params;
    try {
        const orderDetails = await connection.query('SELECT ppl.fk_pedidolinea, p.nombre,ppl.estatus from productospedidolinea ppl, productos p WHERE ppl.fk_pedidolinea = ? && p.id = ppl.fk_producto;',[id])
        res.json(orderDetails)
    } catch (error) {
        res.json({status: "wrong"})
        console.log(error) 
    }
}
controller.TradesmanDeliverOrder = async(req, res)=>{
    const { id } = req.params;
    try {
        await connection.query(`update pedidolinea set estatus = 'Entrega' where id = ?`,[id])
        await connection.query(`update productospedidolinea set estatus = 'Entrega' where fk_pedidolinea = ? `,[id])
        res.json({status: "ok"})
    } catch (error) {
        res.json({status: "wrong"})
        console.log(error)
    }
}
controller.TradesmanMarkAsDelivered = async(req, res)=>{
    const {id}= req.params;
    let today = new Date()
    const fecha = today.toLocaleDateString("en-US")
    const newOnlineSale = {
        fecha,
        fk_pedidolinea: id
    }
    try {
        const productos = await connection.query('select fk_producto, cantidad from productospedidolinea where fk_pedidolinea = ?', [id])
        productos.forEach(async productopl => {
            const cantidadalmacen = await connection.query('select existencias from almacen where fk_producto = ?', [productopl.fk_producto])
            const operacion = parseInt(cantidadalmacen[0].existencias) - parseInt(productopl.cantidad)
            await connection.query('update almacen set existencias = ? where fk_producto = ?', [operacion, productopl.fk_producto])
        });
        await connection.query(`update pedidolinea set estatus = 'Entregado' where id = ?`,[id])
        await connection.query(`update productospedidolinea set estatus = 'Entregado' where fk_pedidolinea = ? `,[id])
        await connection.query('insert into ventalinea set ?',[newOnlineSale])
        res.json({status: "ok"})
    } catch (error) {
        res.json({status: "wrong"})
        console.log(error)
    }
}
module.exports = controller;