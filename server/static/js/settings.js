const settings = document.querySelector('.settings');
const controlbox = document.querySelector('.controlbox');

settings.addEventListener('click',()=>{
    if(controlbox.classList.contains('invisible'))
    {
        controlbox.classList.remove('invisible')
        controlbox.classList.add('visible')
    }else{
        controlbox.classList.remove('visible')
        controlbox.classList.add('invisible')
    }  
})


function clr()
{
    const i = document.querySelector('.instruction');
    i.classList.add('dissapear')
}