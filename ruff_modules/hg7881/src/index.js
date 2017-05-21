'use strict';

var driver = require('ruff-driver');

module.exports = driver({
    
    attach: function (inputs) {
        this.pwm_a_1 = inputs['pwm_a_1'];//left up
        this.pwm_a_2 = inputs['pwm_a_2'];
        this.pwm_b_1 = inputs['pwm_b_1'];//right up
        this.pwm_b_2 = inputs['pwm_b_2'];
        this.pwm_c_1 = inputs['pwm_c_1'];//left down
        this.pwm_c_2 = inputs['pwm_c_2'];
        this.pwm_d_1 = inputs['pwm_d_1'];//right down
        this.pwm_d_2 = inputs['pwm_d_2'];
    },
    exports: {
        turnUp: function () {
            this.pwm_a_1.setDuty(1);
            this.pwm_a_2.setDuty(0);
            this.pwm_b_1.setDuty(1);
            this.pwm_b_2.setDuty(0);
            this.pwm_c_1.setDuty(1);
            this.pwm_c_2.setDuty(0);
            this.pwm_d_1.setDuty(1);
            this.pwm_d_2.setDuty(0);
        },
        turnDown:function(){
            this.pwm_a_1.setDuty(0);
            this.pwm_a_2.setDuty(1);
            this.pwm_b_1.setDuty(0);
            this.pwm_b_2.setDuty(1);
            this.pwm_c_1.setDuty(0);
            this.pwm_c_2.setDuty(1);
            this.pwm_d_1.setDuty(0);
            this.pwm_d_2.setDuty(1);
        },
        turnRight:function(){
            this.pwm_a_1.setDuty(1);
            this.pwm_a_2.setDuty(0);
            this.pwm_c_1.setDuty(0);
            this.pwm_c_2.setDuty(1);

            this.pwm_b_1.setDuty(0);
            this.pwm_b_2.setDuty(0);
            this.pwm_d_1.setDuty(0);
            this.pwm_d_2.setDuty(1);
        },
        turnLeft:function(){
            this.pwm_a_1.setDuty(0);
            this.pwm_a_2.setDuty(1);
            this.pwm_c_1.setDuty(0);
            this.pwm_c_2.setDuty(0);

            this.pwm_b_1.setDuty(0);
            this.pwm_b_2.setDuty(1);
            this.pwm_d_1.setDuty(1);
            this.pwm_d_2.setDuty(0);
        },
        turnStop:function(){
            this.pwm_a_1.setDuty(0);
            this.pwm_a_2.setDuty(0);
            this.pwm_b_1.setDuty(0);
            this.pwm_b_2.setDuty(0);
            this.pwm_c_1.setDuty(0);
            this.pwm_c_2.setDuty(0);
            this.pwm_d_1.setDuty(0);
            this.pwm_d_2.setDuty(0);
        },
        custom:function(list){
            this.pwm_a_1.setDuty(list.pwm_a_1 || 0);
            this.pwm_a_2.setDuty(list.pwm_a_2 || 0);
            this.pwm_b_1.setDuty(list.pwm_b_1 || 0);
            this.pwm_b_2.setDuty(list.pwm_b_2 || 0);
            this.pwm_c_1.setDuty(list.pwm_c_1 || 0);
            this.pwm_c_2.setDuty(list.pwm_c_2 || 0);
            this.pwm_d_1.setDuty(list.pwm_d_1 || 0);
            this.pwm_d_2.setDuty(list.pwm_d_2 || 0);
        },
    }
});
