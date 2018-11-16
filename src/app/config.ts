export const config = {
	apiUrl: 'https://rodrigoibarraapp.herokuapp.com/api', // Produccion
	httpJWTConfig: {
		tokenName: 'rich-koua',    
  		tokenGetter: (() => localStorage.getItem('rich-koua')),
    	noTokenScheme: true,
    	headerName: 'x-access-token',
  		globalHeaders: [{'Content-Type':'application/json'}]
	},
	myDatePickerOptions: {
		// other options...
      	todayBtnTxt: 'Hoy',
        dateFormat: 'yyyy-mm-dd',
        firstDayOfWeek: 'mo',        
        minYear: new Date().getFullYear(),
        maxYear: new Date().getFullYear() + 1,
        dayLabels: {su: 'Domingo', mo: 'Lunes', tu: 'Martes', we: 'Miercoles', th: 'Jueves', fr: 'Viernes', sa: 'Sabado'},
        monthLabels: {
            1: 'Enero',
            2: 'Febrero',
            3: 'Marzo',
            4: 'Abril',
            5: 'Mayo',
            6: 'Junio',
            7: 'Julio',
            8: 'Agosto',
            9: 'Septiembre',
            10: 'Octubre',
            11: 'Noviembre',
            12: 'Diciembre'
        },
        satHighlight: true,
        markCurrentDay: true,
        disableUntil: { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() },
        selectorWidth: '350px',
        editableDateField: false,
        openSelectorOnInputClick: true   
	}
};