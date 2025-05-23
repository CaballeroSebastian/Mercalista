import { FormRegister } from './FormRegister'
import { SectionLeftRegister } from './SectionLeftRegister'
import './Register.css'

function Register() {
  
  return (
    <>
      <header className="header-banner">
        <h1 className="header-title">Mercalista</h1>
      </header>
      < main className='main-mercalista-register'>
        <section className='section-mercalista-register'>
          <SectionLeftRegister>
            
          </SectionLeftRegister>
        </section>
        <aside className='aside-mercalista-register'>
          <FormRegister>

          </FormRegister>
        </aside>
        
      </main> 
      
    </> 
  )
}

export default Register
