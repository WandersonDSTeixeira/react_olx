import styled from 'styled-components';

type Props = {
    open: boolean;
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
        padding: 20px;
        box-shadow: 0px 0px 3px #999;
        max-width: 1000px;
        width: 600px;

        form {
            background-color: #FFF;
            border-radius: 3px;
            padding: 10px;
            box-shadow: 0px 0px 3px #999;

            .area {
                display: flex;
                align-items: center;
                padding: 10px;

                .areaTitle {
                    width: 150px;
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

                    input {
                        width: 90%;
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

                    select {
                        padding: 5px;
                    }

                    button {
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
                }
            }
        }
    }

    @media (max-width: 600px) {
        
        .container form .area {
            flex-direction: column;

            .areaTitle {
                width: 100%;
                padding-right: 0px;
                justify-content: center;
                margin-bottom: 10px;

                .cancelBtn {
                    width: 100%;
                }
            }

            .areaInput {
                width: 100%;

                input {
                    width: 100%;
                    text-align: center;
                }

                select {
                    width: 100%;
                    text-align: center;
                }

                button {
                    width: 100%;
                }
            }
        }
    }
`;