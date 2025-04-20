<template>
    <footer class="Footer">
      <nav id="footer_nav_Uno" class="footer_nav">
        <div>
          <label>Facebook</label>
          <li>Bisuteria-prederia la pajarraca</li>
        </div>
        <div>
          <label>Dirección</label>
          <li>Calle 18 N 100-11 Fontibón</li>
        </div>
      </nav>
      <nav id="footer_nav_Dos" class="footer_nav">
        <div>
          <label>Nombre</label>
          <li>pedrerialaPajarraca</li>
        </div>
        <div>
          <label>Teléfono</label>
          <li>601 4152748</li>
        </div>
      </nav>
      <nav id="footer_nav_Tres" class="footer_nav">
        <div>
          <label>Email</label>
          <li>omarrarevalo@hotmail.es</li>
        </div>
        <div>
          <label>Celular</label>
          <li>311 532 3347</li>
        </div>
      </nav>
    </footer>
  </template>
  

<style scoped>
    .Footer{
        min-height:180px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;        
        background-color:  #ffffff;
        color: #030303;
        flex-direction: row;
        padding: 10px 0px;
        transition: transform 0.3s ease; 
    }
    .Footer .footer_nav{
        background-color: rgba(6, 51, 51, 0);
        width: 80%;
        display: flex;
        justify-content: space-around;
        flex-direction: column;
    }
    .Footer .footer_nav div{
        display: flex;
        background-color: rgba(0, 0, 255, 0);
        flex-direction: column;
        justify-content: center;
        margin: 5px;
        width: 300px;

    }
    .Footer .footer_nav div label{
        color: rgb(0, 0, 0);
        font-weight: bold;
        margin-bottom: 5px
    }
    .Footer .footer_nav div li{
        font-size: 20px;
        width: auto;
        cursor: pointer;
        transition: all 0.5s ease;
    }

    .Footer #footer_nav_Uno{
        background-color: rgba(137, 43, 226, 0);
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .Footer #footer_nav_Dos{
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .Footer {
  min-height: 180px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-around;
  background-color: #ffffff;
  color: #030303;
  flex-direction: row;
  padding: 20px 10px;
  transition: transform 0.3s ease;
  gap: 20px;
}

.footer_nav {
  flex: 1;
  min-width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
}

.footer_nav div {
  display: flex;
  flex-direction: column;
  margin: 5px 0;
}

.footer_nav label {
  font-weight: bold;
  margin-bottom: 5px;
  color: #000;
}

.footer_nav li {
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  list-style: none;
}

/* ✅ Responsive para tablets y móviles */
@media screen and (max-width: 768px) {
  .Footer {
    flex-direction: column;
    align-items: center;
  }

  .footer_nav {
    width: 90%;
    align-items: center;
    text-align: center;
  }

  .footer_nav div {
    width: 100%;
  }

  .footer_nav li {
    font-size: 16px;
  }
}
</style>

