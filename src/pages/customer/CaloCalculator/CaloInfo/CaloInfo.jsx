import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'
import theme from '~/theme'
import { useForm, Controller } from 'react-hook-form'
import { createSearchParams, useNavigate } from 'react-router-dom'

const exerciseLevels = [
  'Không tập luyện',
  'Tập nhẹ (1-3 buổi/tuần)',
  'Tập vừa (3-5 buổi/tuần)',
  'Tập nặng (6-7 buổi/tuần)',
  'Tập rất nặng (2 lần/ngày)'
]

const goals = [
  'Giảm cân',
  'Duy trì cân nặng',
  'Tăng cân'
]

const allergies = [
  'Đậu phộng',
  'Hải sản',
  'Trứng',
  'Sữa',
  'Lúa mì',
  'Đậu nành',
  'Cá',
  'Động vật có vỏ'
]

const styleInput = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.colorSchemes.light.palette.text.primary,
      borderRadius: '8px'
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.colorSchemes.light.palette.text.primary,
      borderRadius: '8px'
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.colorSchemes.light.palette.text.primary,
      borderWidth: '2px',
      borderRadius: '8px'
    }
  },
  '& .MuiInputBase-input': {
    '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0
    },
    '&[type=number]': {
      '-moz-appearance': 'textfield'
    },
    '&.Mui-focused': {
      color: theme.colorSchemes.light.palette.text.primary
    }
  },
  '& .MuiInputLabel-root': {
    fontSize: { xs: '1rem', sm: '0.875rem' },
    color: theme.colorSchemes.light.palette.text.primary,
    '&.Mui-focused': {
      color: `${theme.colorSchemes.light.palette.text.primary} !important`
    }
  }
}

const styleSelect = {
  '& .MuiSelect-select': {
    color: theme.colorSchemes.light.palette.text.primary,
    borderRadius: '8px',
    '&:focus': {
      backgroundColor: 'transparent'
    }
  },
  '& .MuiInputLabel-root': {
    color: theme.colorSchemes.light.palette.text.primary,
    '&.Mui-focused': {
      color: `${theme.colorSchemes.light.palette.text.primary} !important`
    }
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.colorSchemes.light.palette.text.primary,
    borderRadius: '8px'
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.colorSchemes.light.palette.text.primary,
    borderRadius: '8px'
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.colorSchemes.light.palette.text.primary,
    borderWidth: '2px',
    borderRadius: '8px'
  },
  '& .MuiSelect-icon': {
    color: theme.colorSchemes.light.palette.text.primary
  },
  '& .MuiChip-root': {
    borderRadius: '4px',
    margin: '2px'
  },
  '& .MuiButton-root': {
    borderRadius: '8px'
  },
  '& .MuiPaper-root': {
    borderRadius: '8px'
  }
}

const CaloInfo = () => {
  const navigate = useNavigate()
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      gender: '',
      age: '',
      weight: '',
      height: '',
      exerciseLevel: '',
      goal: '',
      allergies: []
    }
  })

  const onSubmit = (data) => {
    console.log('Form submitted:', data)
    const path = createSearchParams(data)
    navigate(`/calo-calculator/suggest?${path.toString()}`)
  }

  const handleClear = () => {
    reset()
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Paper elevation={3} sx={{ p: 4, backgroundColor: theme.palette.primary.card, borderRadius: 5 }}>
        <Typography variant="h5" component="h2" gutterBottom color="text.primary" sx={{ mb: 4, fontWeight: 'bold' }}>
          Thông tin cá nhân
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} method='get' >
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6, md: 6 }}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="gender-label">Giới tính</InputLabel>
                <Controller
                  name="gender"
                  control={control}
                  rules={{ required: 'Vui lòng chọn giới tính' }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      sx={styleSelect}
                      labelId="gender-label"
                      label="Giới tính"
                      error={!!errors.gender}
                    >
                      <MenuItem value="male">Nam</MenuItem>
                      <MenuItem value="female">Nữ</MenuItem>
                    </Select>
                  )}
                />
                {errors.gender && (
                  <Typography color="error" variant="caption">
                    {errors.gender.message}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 6 }}>
              <Controller
                name="age"
                control={control}
                rules={{
                  required: 'Vui lòng nhập tuổi',
                  min: { value: 1, message: 'Tuổi phải lớn hơn 0' },
                  max: { value: 120, message: 'Tuổi không hợp lệ' }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    sx={styleInput}
                    fullWidth
                    margin="normal"
                    label="Tuổi"
                    type="number"
                    error={!!errors.age}
                    helperText={errors.age?.message}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 6 }}>
              <Controller
                name="weight"
                control={control}
                rules={{
                  required: 'Vui lòng nhập cân nặng',
                  min: { value: 20, message: 'Cân nặng không hợp lệ' },
                  max: { value: 300, message: 'Cân nặng không hợp lệ' }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    sx={styleInput}
                    fullWidth
                    margin="normal"
                    label="Cân nặng (kg)"
                    type="number"
                    error={!!errors.weight}
                    helperText={errors.weight?.message}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 6 }}>
              <Controller
                name="height"
                control={control}
                rules={{
                  required: 'Vui lòng nhập chiều cao',
                  min: { value: 100, message: 'Chiều cao không hợp lệ' },
                  max: { value: 250, message: 'Chiều cao không hợp lệ' }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    sx={styleInput}
                    fullWidth
                    margin="normal"
                    label="Chiều cao (cm)"
                    type="number"
                    error={!!errors.height}
                    helperText={errors.height?.message}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="exercise-level-label">Mức độ vận động</InputLabel>
                <Controller
                  name="exerciseLevel"
                  control={control}
                  rules={{ required: 'Vui lòng chọn mức độ vận động' }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      sx={styleSelect}
                      labelId="exercise-level-label"
                      label="Mức độ vận động"
                      error={!!errors.exerciseLevel}
                    >
                      {exerciseLevels.map((level, index) => (
                        <MenuItem key={index} value={level}>
                          {level}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {errors.exerciseLevel && (
                  <Typography color="error" variant="caption">
                    {errors.exerciseLevel.message}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="goal-label">Mục tiêu</InputLabel>
                <Controller
                  name="goal"
                  control={control}
                  rules={{ required: 'Vui lòng chọn mục tiêu' }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      sx={styleSelect}
                      labelId="goal-label"
                      label="Mục tiêu"
                      error={!!errors.goal}
                    >
                      {goals.map((goal, index) => (
                        <MenuItem key={index} value={goal}>
                          {goal}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {errors.goal && (
                  <Typography color="error" variant="caption">
                    {errors.goal.message}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="allergies-label">Dị ứng thực phẩm (nếu có)</InputLabel>
                <Controller
                  name="allergies"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      multiple
                      sx={styleSelect}
                      labelId="allergies-label"
                      label="Dị ứng thực phẩm (nếu có)"
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                    >
                      {allergies.map((allergy) => (
                        <MenuItem key={allergy} value={allergy}>
                          <Checkbox checked={field.value?.includes(allergy)} />
                          {allergy}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
              <Button
                variant="outlined"
                onClick={handleClear}
                sx={{
                  color: theme.colorSchemes.light.palette.text.primary,
                  borderColor: theme.colorSchemes.light.palette.text.primary,
                  '&:hover': {
                    borderColor: theme.colorSchemes.light.palette.text.primary,
                    backgroundColor: 'rgba(0, 0, 0, 0.04)'
                  }
                }}
              >
                Xóa hết
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: theme.colorSchemes.light.palette.primary.main,
                  color: 'white',
                  '&:hover': {
                    backgroundColor: theme.colorSchemes.light.palette.primary.dark
                  }
                }}
              >
                Xác nhận
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  )
}

export default CaloInfo