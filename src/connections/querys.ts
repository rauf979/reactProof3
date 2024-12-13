import { supabase } from './supabase'

export const query = async () => {
  try {
    const { data, error } = await supabase.from('ActaDescarga').select('*')
    if (error != null) {
      console.log('hubo un error', error)
    }
    if ((data != null) && data.length > 0) {
      console.log(data)
    } else {
      console.log(error)
    }
  } catch (e) {
    console.log('el error es:', e)
  }
}

export const insert = async (formData: any) => {
  try {
    const { data, error } = await supabase
      .from('ActaDescarga')
      .insert([{
        fecha: formData.fecha,
        start_verification: formData.inicioVerificacion,
        end_verification: formData.terminoVerificacion,
        oc: formData.oc,
        provider: formData.proveedor,
        origin: formData.origen,
        bill: formData.factura,
        boxes_received: formData.cajasRecibidas,
        varieties: formData.especie,
        cold_disc: formData.frioDescarga,
        carrier_line: formData.lineaTransportista,
        num_cont: formData.numeroContenedor,
        truck_plt: formData.placasCamion,
        box_plt: formData.placasCaja,
        driver: formData.chofer,
        setpoint_temp: formData.tempSetPoint,
        screen_temp: formData.tempPantalla,
        setpoint_obs: formData.observacionesSetPoint,
        screen_obs: formData.observacionesPantalla,
        therm_org: formData.termografo,
        therm_dst: formData.tempDestino,
        therm_org_obs: formData.tempOrigen,
        therm_dst_obs: formData.tempDestino,
        clean_free: formData.limpio,
        clean_obs: formData.observacionesSetPoint, // Ajusta si corresponde
        close: formData.cajaCerrada,
        close_obs: formData.observacionesSetPoint, // Ajusta si corresponde
        box_state: formData.lona,
        box_obs: formData.observacionesSetPoint, // Ajusta si corresponde
        tarp_state: formData.fauna,
        tarp_obs: formData.observacionesSetPoint, // Ajusta si corresponde
        pest_free: formData.carga,
        pest_obs: formData.observacionesSetPoint, // Ajusta si corresponde
        load_state: formData.seguridadCarga,
        load_obs: formData.observacionesSetPoint, // Ajusta si corresponde
        load_sec: formData.seguridadCarga,
        sec_obs: formData.observacionesSetPoint, // Ajusta si corresponde
        seal: formData.sellado,
        seal_obs: formData.observacionesSetPoint, // Ajusta si corresponde
        pallet_dmg: formData.numeroSerie,
        pallet_num: formData.resultadosInv,
        box_id: formData.numeroSerie,
        box_num: formData.resultadosInv,
        box_dmg: formData.numeroSerie,
        dmg_num: formData.resultadosInv,
        tempa_door: formData.tempAPuerta,
        tempa_mid: formData.tempAMedio,
        tempa_back: formData.tempAFondo,
        tempm_door: formData.tempMPuerta,
        tempm_mid: formData.tempMMedio,
        tempm_back: formData.tempMFondo,
        tempb_door: formData.tempBPuerta,
        tempb_mid: formData.tempBMedio,
        tempb_back: formData.tempBFondo,
        temp_min: formData.tempMin,
        temp_max: formData.tempMax,
        temp_ideal: formData.tempIdeal,
        invest_res: formData.resultadosInv,
        insp_name: formData.nombreInspector,
        driver_sign: formData.nombreChofer
      }])

    if (error != null) {
      console.log('Hubo un error:', error)
    } else {
      console.log('Datos insertados correctamente:', data)
    }
  } catch (e) {
    console.log('El error es:', e)
  }
}

export const fetchActas = async () => {
  const { data, error } = await supabase
    .from('ActaDescarga')
    .select(`
      id,
      fecha,
      start_verification,
      end_verification,
      oc,
      provider,
      origin,
      bill,
      varieties,
      cold_disc,
      boxes_received,
      carrier_line,
      num_cont,
      truck_plt,
      box_plt,
      driver,
      setpoint_temp,
      setpoint_obs,
      screen_temp,
      screen_obs,
      therm_org,
      therm_dst,
      clean_free,
      close,
      tarp_state,
      pest_free,
      load_state,
      load_sec,
      seal,
      box_id,
      invest_res,
      tempa_door,
      tempa_mid,
      tempa_back,
      tempm_door,
      tempm_mid,
      tempm_back,
      tempb_door,
      tempb_mid,
      tempb_back,
      temp_max,
      temp_min,
      temp_ideal,
      insp_name,
      pallet_dmg,
      pallet_num,
      box_num,
      dmg_num
    `)

  if (error != null) {
    console.error('Error fetching actas:', error)
    return null
  }

  return data
}
