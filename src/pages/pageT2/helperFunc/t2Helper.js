

export const  unlockClick = (id)=>{
    const editItems = document.querySelectorAll(`.change-user-data-edit-${id}`);
    const unlockItem = document.querySelector(`.change-user-data-unlock-${id}`);
    for (const elem of editItems) {
      elem.classList.remove("change-user-data-edit");
    }
    unlockItem.classList.add("user-data-unlock-hidden");
  };


  export const cancelClick = (id)=>{

    const editItems = document.querySelectorAll(`.change-user-data-edit-${id}`);
    const unlockItem = document.querySelector(`.change-user-data-unlock-${id}`);
    for (const elem of editItems) {
      elem.classList.add("change-user-data-edit");
    }
    unlockItem.classList.remove("user-data-unlock-hidden");
  }

  export  const changePassword = (id,setFormInfo) => {
    const info = {};
    const editInput = document.querySelector(
      `.change-user-data-edit-input-${id}`
    );

    if (editInput.value.length < 4) {
      info.password = "4文字以上、15文字以下のパスワードを入力してください";
    } else if (editInput.value.length > 15) {
      info.password = "4文字以上、15文字以下のパスワードを入力してください";
    }

    if (Object.keys(info).length === 0) {
      info.validateOkFlag = true;
      info.password = editInput.value
      info.userId = id
    }
    setFormInfo(info);

  };