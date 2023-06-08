import styled from 'styled-components';

type Props = {
    userAdsModalOpen: boolean;
    confirmAdDelete: boolean;
}

export const ModalArea = styled.div<Props>`
    display: ${props => props.userAdsModalOpen ? 'flex' : 'none'};
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
        padding: 20px;
        box-shadow: 0px 0px 3px #999;
        max-width: 1000px;
        width: 700px;

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
                padding: 7px;

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

                    textarea {
                        max-height: 100px;
                        height: 150px;
                        resize: none;
                    }
                    
                    input[type=checkbox] {
                        width: auto 
                    }

                    img {
                        width: 23%;
                        border-radius: 5px;
                        margin-right: 3px;
                        cursor: pointer;

                        &:hover {
                            border: 2px solid #F00;
                        }
                    }

                    .areaBtn {
                        display: flex;
                        justify-content: space-between;
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
                        display: ${props => props.confirmAdDelete ? 'none' : 'inline-block' };
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
                        display: ${props => props.confirmAdDelete ? 'inline-block' : 'none' };
                        background-color: #FFF;
                        color: #E2231F;
                        border: 0;
                        outline: 0;
                        font-size: 14px;
                        cursor: pointer;
                        width: 120px;
                        height: 30px;
                        padding: 5px 10px;
                        border-radius: 4px;
                        border: 1px solid #E2231F;
                    }

                    .cancelDelBtn {
                        display: ${props => props.confirmAdDelete ? 'inline-block' : 'none' };
                        background-color: #FFF;
                        color: #006FCE;
                        border: 0;
                        outline: 0;
                        font-size: 14px;
                        cursor: pointer;
                        width: 170px;
                        height: 30px;
                        padding: 5px 10px;
                        border-radius: 4px;
                        border: 1px solid #006FCE;
                    }
                }
            }
        }
    }

    @media (max-width: 700px) {

        .container form .area {
            flex-direction: column;

            .areaTitle {
                width: 100%;
                justify-content: center;
                text-align: center;
                padding-right: 0;
                margin-bottom: 10px;

                .cancelBtn {
                    width: 100%;  
                }
            }

            .areaImgTitle {
                display: flex;
                flex-direction: row;
                width: 100%;

                .areaTitle {
                    flex: 1;
                }
                .areaImgTitle1 {
                    justify-content: flex-end;
                    margin-left: 80px;
                }
                .areaImgTitle2 {
                    justify-content: flex-start;
                    margin-left: 5px;
                }
            }

            .areaInput {
                width: 100%;

                input, select, textarea {
                    width: 100%;
                    text-align: center;
                }
                
                input[type=checkbox] {
                    width: 100%;
                }

                .areaBtn {
                    flex-direction: column;
                }   
                .areaBtn button {
                    width: 100%;
                    margin-bottom: 10px;
                }
            }
        }
    }

    @media (max-width: 450px) {

        .container form .area .areaInput img {
            width: 30%;
        }
    }
`;