import mongoose from 'mongoose';

const tipoprocesoSchema = new mongoose.Schema({
  id_tipo: {
    type: Number,
    required: true,
    unique: true,  
  },
  nombre: {
    type: String,
    required: true,
    enum: ['Notariales', 'Juzgados', 'Curadurías'],  
  },
}, { timestamps: true });

const TipoProcess = mongoose.model('TipoProcess', tipoprocesoSchema, 'tipoprocesos');  

export default TipoProcess;
