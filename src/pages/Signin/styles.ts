import styled from 'styled-components';

export const PageArea = styled.div`
    
    form {
        background-color: #FFF;
        border-radius: 3px;
        padding: 10px;
        box-shadow: 0px 0px 3px #999;

        .area {
            display: flex;
            align-items: center;
            padding: 10px;
            max-width: 500px;

            .areaTitle {
                width: 200px;
                text-align: right;
                padding-right: 20px;
                font-weight: bold;
                font-size: 14px;
            }

            .areaInput {
                flex: 1;

                input {
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

                input[type=checkbox] {
                    width: auto 
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

                    &:hover {
                        background-color: #006FCE;
                    }
                }
            }
        }
    }

    @media (max-width: 600px) {

        form {

            .area {
                flex-direction: column;

                .areaTitle {
                    width: 100%;
                    text-align: left;
                    margin-bottom: 10px;
                }

                .areaInput { 
                    width: 100%;

                    button {
                        width: 100%;
                        padding: 10px;
                    }
                }
            }
        }
    }
`;