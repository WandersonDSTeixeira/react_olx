import styled from 'styled-components';

type Props = {
    open: boolean;
    confirmDeletion: boolean;
}

export const ModalArea = styled.div<Props>`
    display: ${props => props.open ? 'flex' : 'none'};
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 999;
    transition: all ease .2s;
    justify-content: center;
    align-items: center;

    .container {
        background-color: #FFF;
        border-radius: 3px;
        padding: 10px;
        box-shadow: 0px 0px 3px #999;

        form {
            background-color: #FFF;
            border-radius: 3px;
            padding: 10px;
            box-shadow: 0px 0px 3px #999;
            max-height: 95vh;
            overflow-y: scroll;

            .area {
                display: flex;
                align-items: center;
                padding: 10px;
                max-width: 1000px;
                width: 700px;

                .areaTitle {
                    width: 200px;
                    text-align: right;
                    padding-right: 20px;
                    font-weight: bold;
                    font-size: 14px;
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;

                    .cancelBtn {
                        background-color: #F44336;
                        border: 0;
                        outline: 0;
                        padding: 5px 10px;
                        border-radius: 4px;
                        color: #FFF;
                        font-size: 14px;
                        cursor: pointer;
                        width: 100px;
                        font-weight: normal;
                        text-align: center;
                        height: 30px;

                        &:hover {
                            background-color: #E2231F;
                        }
                    }
                }

                .areaInput {
                    flex: 1;

                    input, select, textarea {
                        width: 100%;
                        font-size: 14px;
                        padding: 5px;
                        border: 1px solid #DDD;
                        border-radius: 3px;
                        outline: 0;
                        transition: all ease .4s;

                        &:focus {
                            border: 1px solid #333;
                            color: #333;
                        }
                    }

                    img {
                        width: 100px;
                        border-radius: 5px;
                        margin-right: 10px;
                        cursor: pointer;

                        &:hover {
                            border: 2px solid #F00;
                        }
                    }

                    textarea {
                        max-height: 100px;
                    }
                    
                    input[type=checkbox] {
                        width: auto 
                    }
                    
                    textarea {
                        height: 150px;
                        resize: none;
                    }

                    .editBtn {
                        background-color: #0089FF;
                        border: 0;
                        outline: 0;
                        padding: 5px 10px;
                        border-radius: 4px;
                        color: #FFF;
                        font-size: 14px;
                        cursor: pointer;
                        width: 100px;
                        height: 30px;

                        &:hover {
                            background-color: #006FCE;
                        }
                    }

                    .deleteBtn {
                        display: ${props => props.confirmDeletion ? 'none' : 'inline-block' };
                        background-color: #FFF;
                        color: #000;
                        border: 0;
                        outline: 0;
                        font-size: 14px;
                        cursor: pointer;
                        width: 100px;
                        height: 30px;
                        padding: 5px 10px;
                        border-radius: 4px;
                        border: 1px solid #DDD;

                        &:hover {
                            border: 1px solid #E2231F;
                            color: #E2231F;
                            background-color: #FFF
                        }
                    }

                    .confirmDelBtn {
                        display: ${props => props.confirmDeletion ? 'inline-block' : 'none' };
                        background-color: #FFF;
                        color: #E2231F;
                        border: 0;
                        outline: 0;
                        font-size: 14px;
                        cursor: pointer;
                        width: 150px;
                        height: 30px;
                        padding: 5px 10px;
                        border-radius: 4px;
                        border: 1px solid #E2231F;
                    }

                    .cancelDelBtn {
                        display: ${props => props.confirmDeletion ? 'inline-block' : 'none' };
                        background-color: #FFF;
                        color: #006FCE;
                        border: 0;
                        outline: 0;
                        font-size: 14px;
                        cursor: pointer;
                        width: 200px;
                        height: 30px;
                        padding: 5px 10px;
                        border-radius: 4px;
                        border: 1px solid #006FCE;
                    }

                    .areaBtn {
                        display: flex;
                        justify-content: space-between;
                    }
                }
            }
        }
    }
`;