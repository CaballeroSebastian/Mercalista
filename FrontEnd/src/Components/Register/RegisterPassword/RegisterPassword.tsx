import { FormRegisterPassword } from './FormRegisterPassword'
import './RegisterPassword.css'
import { SectionLeftRegisterPassword } from './SectionLeftRegisterPassword'

function RegisterPassword() {
  
  return (
    <>
      <header className="header-banner">
        <h1 className="header-title">Mercalista</h1>
      </header>
      < main className='main-mercalista-register'>
        <section className='section-mercalista-register'>
          <SectionLeftRegisterPassword>
            
          </SectionLeftRegisterPassword>
        </section>
        <aside className='aside-mercalista-register'>
          <FormRegisterPassword>

          </FormRegisterPassword>
        </aside>
        
      </main> 
      
    </> 
  )
}

export default RegisterPassword
