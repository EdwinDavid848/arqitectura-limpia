<template>
    <footer class="Footer">
        <nav id="footer_nav_Uno" class="footer_nav">
            <div>
                <label for="">Facebook</label>
                <li>Bisuteria-prederia la pajarraca</li>
            </div>
            <div>
                <label for="">Direccion</label>
                <li>calle 18 N 100-11 fontibon </li>
            </div>
        </nav>
        <nav id="footer_nav_Dos" class="footer_nav">
            <div>
                <label for="">Nombre</label>
                <li>pedrerialaPajarraca</li>
            </div>
            <div>
                <label for="">Numero Telefonico</label>
                <li>601 4152748</li>
            </div>
        </nav>
        <nav id="footer_nav_Dos" class="footer_nav">
            <div>
                <label for="">Email:</label>
                <li>omarrarevalo@hotmail.es</li>
            </div>
            <div>
                <label for="">Numero Telefonico</label>
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
</style>

