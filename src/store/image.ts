import create from 'zustand'
import { persist } from 'zustand/middleware'


type Agent = {
  
  stockImg: string 
  setStockImg: (stockImg: string) => void
  addImg: any
  setAddImg: (addImg: any) => void
}


export const useStoreImg = create(persist((set,get) => ({
    stockImg : '',
    addImg: (param:string) => set({stockImg:param}),

    
  }),
  { name: 'image-storage',
  getStorage: () => sessionStorage, } )
  
  )
